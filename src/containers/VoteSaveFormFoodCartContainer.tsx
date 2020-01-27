import React, { useEffect, useState } from 'react'
import * as _ from 'lodash'
import config from '../config'

import { connect } from '../redux/redux-connect'
import { getAddressByCoordinate } from '../api/google-api'
import { Plugins } from '@capacitor/core'
import { IVoteForm } from '../models/vote'
import { setVoteForm } from '../redux/vote/vote-actions'
import IconUi from '../components/ui/IconUi'
import { IonModal, IonButton, IonHeader, IonToolbar } from '@ionic/react'

import './VoteSaveFormFoodCartContainer.scss'
import GoogleMapReact from 'google-map-react'

// eslint-disable-next-line
const Marker = ({}: any) => (
  <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
    <IconUi iconName='location-pin' />
  </div>
)

interface IOwnProps {}
interface IStateProps {
  voteForm: IVoteForm
}
interface IDispatchProps {
  setVoteForm: typeof setVoteForm
}

const VoteSaveFormFoodCartContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  voteForm,
  setVoteForm
}) => {
  const [address, setAddress] = useState('주소를 불러오는중...')
  const [isShowModal, setIsShowModal] = useState(false)

  const [coordinate, setCoordinate] = useState({ lat: 37.4961895, lng: 127.0253834 })

  useEffect(() => {
    getCurrentPosition()
  }, []) // eslint-disable-line

  useEffect(() => {
    getAddress(coordinate.lat, coordinate.lng)
  }, [coordinate])

  const getCurrentPosition = async () => {
    const { coords } = await Plugins.Geolocation.getCurrentPosition()
    setCoordinate({ lat: coords.latitude, lng: coords.longitude })
    // setVoteForm({ placeIds: [address] })
  }

  const getAddress = async (latitude: number, longitude: number) => {
    const { data }: any = await getAddressByCoordinate(latitude, longitude)
    setAddress(_.get(data.results, '[0].formatted_address'))
  }

  return (
    <div className='px-container pt-4'>
      <div className='text-xxl text-bold flex items-center' onClick={() => setIsShowModal(true)}>
        <div className='ellipsis'>{address}</div>
        <IconUi className='ml-2' iconName='location'></IconUi>
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
    voteForm: vote.voteForm
  }),
  mapDispatchToProps: {
    setVoteForm
  },
  component: VoteSaveFormFoodCartContainer
})
