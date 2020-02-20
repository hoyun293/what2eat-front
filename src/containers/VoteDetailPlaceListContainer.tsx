import React, { useEffect, useState } from 'react'
import * as _ from 'lodash'

import { connect } from '../redux/redux-connect'
import IconUi from '../components/ui/IconUi'
import { Plugins } from '@capacitor/core'
import { IonModal, IonPopover } from '@ionic/react'
import VoteDetailPlaceListItem from '../components/VoteDetailPlaceListItem'

import './VoteDetailPlaceListContainer.scss'

const places = [
  {
    placeId: '123',
    name: '데블스토어',
    photoUrl: 'assets/img/food-1.jpeg',
    lat: 37.4961895,
    lng: 127.0253834,
    voteCount: 5,
    isAdded: false
  },
  {
    placeId: '1234',
    name: '고반식당 삼성점',
    photoUrl: 'assets/img/food-2.jpeg',
    lat: 39.4961895,
    lng: 127.0253834,
    voteCount: 2,
    isAdded: false
  },
  {
    placeId: '12345',
    name: '칼리가리박사의 밀실',
    photoUrl: 'assets/img/food-3.jpeg',
    lat: 34.4961895,
    lng: 127.0253834,
    voteCount: 5,
    isAdded: false
  },
  {
    placeId: '134',
    name: '느린마을 양조장 강남점',
    photoUrl: 'assets/img/food-4.jpeg',
    lat: 31.4961895,
    lng: 127.0253834,
    voteCount: 1,
    isAdded: false
  }
]
interface IOwnProps {
  themeNum: number
}
interface IStateProps {}
interface IDispatchProps {}
const INIT_LATITUDE = 37.4961895
const INIT_LONGITUDE = 127.0253834
const VoteDetailPlaceListContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({ themeNum }) => {
  const [isShowModal, setIsShowModal] = useState(false)
  const [coordinate, setCoordinate] = useState({ lat: INIT_LATITUDE, lng: INIT_LONGITUDE })

  useEffect(() => {
    getCurrentPosition()
  }, []) // eslint-disable-line

  const getCurrentPosition = async () => {
    try {
      const { coords } = await Plugins.Geolocation.getCurrentPosition()
      setCoordinate({ lat: coords.latitude, lng: coords.longitude })
    } catch (e) {
      setCoordinate({ lat: 37.4961895, lng: 127.0253834 })
    }
  }

  return (
    <div className='vote-detail-place-list-container flex flex-col move-up'>
      <div className='px-container'>
        <div className='vote-detail-place-list-container__handle'></div>
        <div className='flex justify-between mx-1'>
          <div>
            총 <span className='yellow-dark'>4</span>개
          </div>
          <div className='flex gray'>
            <IconUi iconName='multi-vote' className='mr-1'></IconUi>복수투표 가능
          </div>
        </div>
        <ul>
          {_.map(places, (v, i) => (
            <VoteDetailPlaceListItem
              placeId={v.placeId}
              name={v.name}
              photoUrl={v.photoUrl}
              voteCount={v.voteCount}
              nowLatitude={coordinate.lat}
              nowLongitude={coordinate.lng}
              lat={v.lat}
              lng={v.lng}
              isAdded={v.isAdded}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({}) => ({}),
  mapDispatchToProps: {},
  component: VoteDetailPlaceListContainer
})
