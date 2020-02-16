import {
  IonContent,
  IonHeader,
  IonFooter,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonSlides,
  IonSlide,
  IonSelect
} from '@ionic/react'
import VoteSaveFormContainer from '../containers/VoteSaveFormContainer'
import VoteSaveFormFoodCartContainer from '../containers/VoteSaveFormFoodCartContainer'
import React, { useEffect, useState, Fragment } from 'react'
import { useHistory } from 'react-router-dom'

import { connect } from '../redux/redux-connect'
import ButtonShadowUi from '../components/ui/ButtonShadowUi'
import ButtonUi from '../components/ui/ButtonUi'
import IconUi from '../components/ui/IconUi'
import { IVoteForm } from '../models/vote'
import './RestaurantDetail.scss'
import ReviewStar from '../components/ReviewStar'
import { RouteComponentProps } from 'react-router'
import GoogleMapReact from 'google-map-react'
import config from '../config'
import { getRestaurantDetail } from '../api/restaurant-detail-api'
import { selectRestaurnatDetail } from '../redux/restaurant-detail/restaurant-detail-actions'
import { IRestaurantDetail } from '../models/restaurant-detail'
import { IRestaurantDetailState } from '../redux/restaurant-detail/restaurant-detail-state'
import _ from 'lodash'
import RestaurantPhotoSlideContainer from '../containers/RestaurantPhotoSlideContainer'
interface IOwnProps {}
interface IStateProps {
  restaurantDetailInfo: IRestaurantDetail
}
interface IDispatchProps {
  selectRestaurnatDetail: typeof selectRestaurnatDetail
}
interface MatchParams {
  placeId: string
}

// 무한루프를 방지하기 위한 변수
var i = 0

const Marker = ({}: any) => (
  <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
    <IconUi iconName='location-pin' />
  </div>
)

const ionSlideTemplate = (arr?: string[]): string => {
  if (arr === undefined) {
    return ''
  }
  var cnt = arr.length
  var num = cnt / 3
  var remainder = cnt % 3

  var template
  var idx = 0
  var j = 0
  for (j = 0; j < num; j++) {
    template =
      template +
      `<IonSlide>
        <div class='foodPhotoBox flex justify-between ml-5 mr-5'>
          <img class='foodPhoto' src='${arr[idx]}'></img>
          <img class='foodPhoto' src='${arr[idx + 1]}'></img>
          <img class='foodPhoto' src='${arr[idx + 2]}'></img>
        </div>
      </IonSlide>`
    idx = idx + 3
  }

  if (remainder !== 0) {
    template =
      template +
      `<IonSlide>
        <div className='foodPhotoBox flex justify-between ml-5 mr-5'>
          <img class='foodPhoto' src='${arr[idx]}'></img>
          <img class='foodPhoto' src='${arr[idx + 1]}'></img>
          <img class='foodPhoto' src='${arr[idx + 2]}'></img>
        </div>
      </IonSlide>`
  }
  //const myElement: HTMLElement | null = template
  //document.getElementById('inHere')?.innerHTML = template
  return template as string
}

const RestaurantDetail: React.FC<IOwnProps &
  IStateProps &
  IDispatchProps &
  RouteComponentProps<MatchParams>> = ({ match, restaurantDetailInfo, selectRestaurnatDetail }) => {
  const history = useHistory()
  const [photoURL, setPhotoURL] = useState('1')
  var tempArr = new Array()
  const slideOpts = {
    initialSlide: 1,
    speed: 400
  }
  useEffect(() => {
    if (i == 0) {
      selectRestaurnatDetail(match.params.placeId)
      i++
    }
  }, [restaurantDetailInfo]) // eslint-disable-line

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='thumbnail w-full'>
          <img className='thumbnailImg' src={restaurantDetailInfo.photoUrl}></img>
        </div>
        <div className='restaurantInfo flex-col'>
          <div className='title w-full text-center text-xxl pt-2'>{restaurantDetailInfo.name}</div>
          <div className='rating w-full flex'>
            <ReviewStar
              className='ratingCenter pt-2'
              rating={restaurantDetailInfo.rating}
              userRatingsTotal={restaurantDetailInfo.userRatingsTotal}
            ></ReviewStar>
          </div>
          <div className='address flex text-left pt-4'>
            <img className='ml-3' src='/assets/icon/location2.svg' alt='' />
            <div className='flex-col'>
              <div className='addressInBlack ml-3 mr-2'>{restaurantDetailInfo.formattedAddress}</div>
              <div className='addressInPurple ml-3 '>현재위치에서 265m</div>
            </div>
          </div>
          <div className='operatingTime ml-3 flex pt-2'>
            <img src='/assets/icon/clock2.svg' alt='' />
            <div className='timeInPurple ml-3'>영업중</div>
            <div className='timeInBlack ml-3'>종료시간 : 오후 10시</div>
          </div>
          <div className='phoneNumber mt-2 ml-3 flex'>
            <img src='/assets/icon/phone.svg' alt='' />
            <div className='numberInBlack ml-3'>{restaurantDetailInfo.formattedPhoneNumber}</div>
          </div>
        </div>

        <hr className='line mt-7' />
        <div className='map text-base ml-3 mt-5'>지도</div>
        <div className='googleMap mt-3'>
          <GoogleMapReact
            bootstrapURLKeys={{ key: config.GOOGLE_MAP_KEY }}
            defaultCenter={{ lat: restaurantDetailInfo.lat, lng: restaurantDetailInfo.lng }}
            center={{ lat: restaurantDetailInfo.lat, lng: restaurantDetailInfo.lng }}
            defaultZoom={15}
            options={{ fullscreenControl: false, zoomControl: false }}
          >
            <Marker lat={restaurantDetailInfo.lat} lng={restaurantDetailInfo.lng} />
          </GoogleMapReact>
        </div>

        <div className='photo mt-3 ml-3 text-base mb-3'>사진</div>
        <IonSlides pager={true} options={slideOpts}>
          <IonSlide>
            <div className='foodPhotoBox flex justify-between ml-5 mr-5'>
              <img className='foodPhoto' src=''></img>
            </div>
          </IonSlide>
        </IonSlides>
      </IonContent>
      <IonFooter>
        <ButtonUi color='yellow' text='후보지 추가' />
      </IonFooter>
    </IonPage>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ restaurantDetail }) => ({
    restaurantDetailInfo: restaurantDetail.restaurantDetailInfo
  }),
  mapDispatchToProps: {
    selectRestaurnatDetail
  },
  component: RestaurantDetail
})
