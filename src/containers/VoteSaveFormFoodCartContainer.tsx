import React, { useEffect, useState } from 'react'
import * as _ from 'lodash'
import config from '../config'

import { connect } from '../redux/redux-connect'
import { getAddressByCoordinate } from '../api/google-api'
import { Plugins } from '@capacitor/core'
import { IVoteForm } from '../models/vote'
import { setVoteForm, selectVotePlaces, deleteVotePlace, setVotePlace } from '../redux/vote/vote-actions'
import IconUi from '../components/ui/IconUi'
import {
  IonItem,
  IonModal,
  IonButton,
  IonHeader,
  IonToolbar,
  IonPopover,
  IonFabButton,
  IonFab,
  IonLabel,
  IonSelect,
  IonSelectOption
} from '@ionic/react'
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
  setVotePlace: typeof setVotePlace
  deleteVotePlace: typeof deleteVotePlace
}

const INIT_LATITUDE = 37.4961895
const INIT_LONGITUDE = 127.0253834

const VoteSaveFormFoodCartContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  voteForm,
  votePlaces,
  setVoteForm,
  selectVotePlaces,
  setVotePlace,
  deleteVotePlace
}) => {
  const [address, setAddress] = useState('주소를 불러오는중...')
  const [isShowModal, setIsShowModal] = useState(false)
  const [isShowCartModal, setIsShowCartModal] = useState(false)
  const [filterDistance, setFilterDistance] = useState(1000)
  const [sortBy, setSortBy] = useState({ label: '거리순', value: 'distance' })

  const [coordinate, setCoordinate] = useState({ lat: INIT_LATITUDE, lng: INIT_LONGITUDE })

  useEffect(() => {
    getCurrentPosition()
  }, []) // eslint-disable-line

  useEffect(() => {
    if (coordinate.lat === INIT_LONGITUDE) return
    getAddress(coordinate.lat, coordinate.lng)

    selectVotePlaces()
  }, [coordinate, sortBy, filterDistance]) // eslint-disable-line

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

  const toggleSortBy = () => {
    switch (sortBy.value) {
      case 'distance':
        setSortBy({ label: '인기순', value: 'prominence' })
        break
      case 'prominence':
        setSortBy({ label: '거리순', value: 'distance' })
        break
    }
  }

  return (
    <div className='px-container pt-4'>
      <div className='text-xxl text-bold flex items-center' onClick={() => setIsShowModal(true)}>
        <div className='ellipsis'>{address}</div>
        {coordinate.lat !== 0 && <IconUi className='ml-2' iconName='location'></IconUi>}
      </div>
      <div className='flex items-center justify-between mt-3'>
        <div className='filter-btn flex-center text-lg m-black'>
          <IonLabel>
            <IconUi iconName='filter' className='pr-1'></IconUi>
          </IonLabel>
          <IonSelect value={filterDistance} onIonChange={({ detail }) => setFilterDistance(detail.value)}>
            <IonSelectOption value={500}>0.5 km</IonSelectOption>
            <IonSelectOption value={1000}>1 km</IonSelectOption>
            <IonSelectOption value={1500}>1.5 km</IonSelectOption>
            <IonSelectOption value={2000}>2 km</IonSelectOption>
            <IonSelectOption value={3000}>3 km</IonSelectOption>
          </IonSelect>
        </div>
        <div className='flex-center text-lg m-black' onClick={() => toggleSortBy()}>
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
            isAdded={voteForm?.votePlaces?.hasOwnProperty(v.placeId)}
            onClickItem={voteForm?.votePlaces?.hasOwnProperty(v.placeId) ? deleteVotePlace : setVotePlace}
          ></VotePlaceItem>
        ))}
      </div>

      <div className='flex-center fixed cart-list-btn' onClick={() => setIsShowCartModal(true)}>
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

      <IonPopover isOpen={isShowCartModal} cssClass='cart-list-modal'>
        <div>
          <div className='cart-lit-modal__header flex-center text-xl black text-bold'>추가한 투표지</div>
          <div className='flex-column'>
            {_.map(voteForm.votePlaces, v => (
              <div className='flex justify-between p-4'>
                <div className='flex items-center'>
                  <div
                    className='thumb-container'
                    style={{
                      backgroundImage: `url(${v.imageUrl || '/assets/img/list-place-thumb-empty.svg'})`,
                      backgroundSize: v.imageUrl ? 'cover' : 'initial'
                    }}
                  ></div>
                  <div className='pl-4'>{v.name}</div>
                </div>
                <IconUi onClick={() => deleteVotePlace(v)} iconName='remove-btn'></IconUi>
              </div>
            ))}
          </div>
          <div
            onClick={() => setIsShowCartModal(false)}
            className='purple text-sm flex-center cart-list-modal__confirm-btn'
          >
            확인
          </div>
        </div>
      </IonPopover>
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
    deleteVotePlace,
    setVotePlace
  },
  component: VoteSaveFormFoodCartContainer
})
