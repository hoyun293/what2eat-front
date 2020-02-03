import React, { useEffect, useState } from 'react'
import * as _ from 'lodash'
import config from '../config'

import { connect } from '../redux/redux-connect'
import { getAddressByCoordinate } from '../api/google-api'
import { Plugins } from '@capacitor/core'
import { IVoteForm } from '../models/vote'
import { setVoteForm, selectVotePlaces, deleteVotePlaceId, setVotePlaceId } from '../redux/vote/vote-actions'
import IconUi from '../components/ui/IconUi'
import { IonModal, IonButton, IonHeader, IonToolbar } from '@ionic/react'
import VotePlaceItem from '../components/VotePlaceItem'

import './VoteSaveFormFoodCartContainer.scss'
import GoogleMapReact from 'google-map-react'
import { IPlace } from '../models/place'

// eslint-disable-next-line
const Marker = ({}: any) => (
  <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
    <IconUi iconName='location-pin' />
  </div>
)

interface IOwnProps {}
interface IStateProps {
  voteForm: IVoteForm
  votePlaces: IPlace[]
}
interface IDispatchProps {
  setVoteForm: typeof setVoteForm
  selectVotePlaces: typeof selectVotePlaces
  setVotePlaceId: typeof setVotePlaceId
  deleteVotePlaceId: typeof deleteVotePlaceId
}

const VoteSaveFormFoodCartContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  voteForm,
  votePlaces,
  setVoteForm,
  selectVotePlaces,
  setVotePlaceId,
  deleteVotePlaceId
}) => {
  const [address, setAddress] = useState('주소를 불러오는중...')
  const [isShowModal, setIsShowModal] = useState(false)
  const [filterDistance, setFilterDistance] = useState(1000)
  const [sortBy, setSortBy] = useState({ label: '거리순', value: 'distance' })

  const [coordinate, setCoordinate] = useState({ lat: 37.4961895, lng: 127.0253834 })

  useEffect(() => {
    getCurrentPosition()
  }, []) // eslint-disable-line

  useEffect(() => {
    if (!coordinate.lat) return

    getAddress(coordinate.lat, coordinate.lng)

    // TODO: coordinate 변경시엔 리셋해야함
    selectVotePlaces()
  }, []) // eslint-disable-line
  // }, [coordinate]) // eslint-disable-line

  const getCurrentPosition = async () => {
    try {
      const { coords } = await Plugins.Geolocation.getCurrentPosition()
      setCoordinate({ lat: coords.latitude, lng: coords.longitude })
    } catch (e) {
      console.log(e)
      setCoordinate({ lat: 37.4961895, lng: 127.0253834 })
    }
  }

  const getAddress = async (latitude: number, longitude: number) => {
    const { data }: any = await getAddressByCoordinate(latitude, longitude)
    setAddress(_.get(data.results, '[0].formatted_address'))
  }

  return (
    <div className='px-container pt-4'>
      <div className='text-xxl text-bold flex items-center' onClick={() => setIsShowModal(true)}>
        <div className='ellipsis'>{address}</div>
        {coordinate.lat !== 0 && <IconUi className='ml-2' iconName='location'></IconUi>}
      </div>
      <div className='flex items-center justify-between mt-3'>
        <div className='filter-btn flex-center text-lg m-black'>
          <IconUi iconName='filter' className='pr-1'></IconUi> {(filterDistance / 1000).toFixed(1)}km
        </div>
        <div className='flex-center text-lg m-black'>
          <IconUi iconName='sort' className='pt-1 pr-1'></IconUi> {sortBy.label}
        </div>
      </div>

      <div className='pt-8'>
        {_.map(votePlaces, v => (
          <VotePlaceItem
            key={v.placeId}
            placeId={v.placeId}
            name={v.name}
            rating={v.rating}
            ratingCount={v.ratingCount}
            latitude={v.latitude}
            longitude={v.longitude}
            nowLatitude={coordinate.lat}
            nowLongitude={coordinate.lng}
            imageUrl={v.imageUrl}
            isAdded={voteForm?.placeIds?.hasOwnProperty(v.placeId)}
            onClickItem={voteForm?.placeIds?.hasOwnProperty(v.placeId) ? deleteVotePlaceId : setVotePlaceId}
          ></VotePlaceItem>
        ))}
      </div>

      <div className='flex-center fixed cart-list-btn'>
        <IconUi iconName='cart-list' className='pt-1'></IconUi>
      </div>

      <IonModal isOpen={isShowModal}>
        <div style={{ height: '100vh', width: '100%' }}>
          <IconUi
            className='back-btn'
            iconName='icon-left-arrow'
            onClick={() => setIsShowModal(false)}
          ></IconUi>
          <div className='map-container reload-btn-container'>
            <IconUi
              className='reload-btn'
              iconName='location-reload'
              onClick={() => getCurrentPosition()}
            ></IconUi>
          </div>
          <div className='map-container address-container'>{address}</div>
          <GoogleMapReact
            bootstrapURLKeys={{ key: config.GOOGLE_MAP_KEY }}
            defaultCenter={coordinate}
            center={coordinate}
            defaultZoom={15}
            options={{ fullscreenControl: false, zoomControl: false }}
            onClick={({ lat, lng }) => setCoordinate({ lat, lng })}
          >
            <Marker lat={coordinate.lat} lng={coordinate.lng} />
          </GoogleMapReact>
        </div>
      </IonModal>
    </div>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ vote }) => ({
    voteForm: vote.voteForm,
    votePlaces: vote.votePlaces
  }),
  mapDispatchToProps: {
    setVoteForm,
    selectVotePlaces,
    deleteVotePlaceId,
    setVotePlaceId
  },
  component: VoteSaveFormFoodCartContainer
})
