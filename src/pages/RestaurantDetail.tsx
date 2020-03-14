import { IonContent, IonFooter, IonPage, IonImg } from '@ionic/react'
import React, { useEffect, useState } from 'react'

import { connect } from '../redux/redux-connect'
import ButtonUi from '../components/ui/ButtonUi'
import IconUi from '../components/ui/IconUi'
import './RestaurantDetail.scss'
import ReviewStar from '../components/ReviewStar'
import { RouteComponentProps, useHistory } from 'react-router'
import GoogleMapReact from 'google-map-react'
import config from '../config'
import {
  selectRestaurnatDetail,
  setRestaurantDetailInit
} from '../redux/restaurant-detail/restaurant-detail-actions'
import { IRestaurantDetail } from '../models/restaurant-detail'
import _ from 'lodash'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import RestaurantPhotoSlideContainer from '../containers/RestaurantPhotoSlideContainer'
import PopUpImageContainer from '../containers/PopUpImageContainer'
import { setUiIsLoader } from '../redux/ui/ui-actions'

interface IOwnProps {}
interface IStateProps {
  restaurantDetailInfo: IRestaurantDetail
}
interface IDispatchProps {
  selectRestaurnatDetail: typeof selectRestaurnatDetail
  setRestaurantDetailInit: typeof setRestaurantDetailInit
  setUiIsLoader: typeof setUiIsLoader
}
interface MatchParams {
  placeId: string
}

const Marker = ({}: any) => (
  <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
    <IconUi iconName='location-pin' />
  </div>
)

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3
}

const RestaurantDetail: React.FC<IOwnProps &
  IStateProps &
  IDispatchProps &
  RouteComponentProps<MatchParams>> = ({
  match,
  restaurantDetailInfo,
  selectRestaurnatDetail,
  setRestaurantDetailInit,
  setUiIsLoader
}) => {
  const photoUrlArr = _.map(restaurantDetailInfo.userPhotoUrl, (val, key) => {
    return val
  })
  const [index, setIndex] = useState(0)
  const [popUpImageUrl, setPopUpImageUrl] = useState('')
  const [isPopUp, setIsPopUp] = useState(false)
  useEffect(() => {
    if (index === 0) {
      setUiIsLoader(true)
      selectRestaurnatDetail(match.params.placeId)
      setIndex(index + 1)
    }
    if (index === 1) {
      setUiIsLoader(false)
    }
    if (photoUrlArr.length === 1) {
      settings.slidesToScroll = 1
      settings.slidesToShow = 1
    } else if (photoUrlArr.length === 2) {
      settings.slidesToScroll = 2
      settings.slidesToShow = 2
    } else if (photoUrlArr.length >= 3) {
      settings.slidesToScroll = 3
      settings.slidesToShow = 3
    }
  }, [restaurantDetailInfo]) // eslint-disable-line

  const history = useHistory()
  return (
    <IonPage>
      <IonContent fullscreen>
        <div
          className='image-container flex-col'
          style={{
            backgroundImage: `url(${restaurantDetailInfo.photoUrl ||
              '/assets/img/list-place-thumb-empty.svg'})`,
            backgroundSize: restaurantDetailInfo.photoUrl ? 'cover' : 'initial'
          }}
        >
          <div className='thumbnail w-full '>
            <div className='thumbnailImgs flex'>
              <IonImg src='/assets/img/vote-place-thumb-holder.png' alt='' />
              <IonImg
                className='btn_close'
                src='/assets/icon/header_btn_close.svg'
                alt=''
                onClick={() => {
                  history.goBack()
                  setRestaurantDetailInit()
                }}
              />
            </div>
          </div>
          <div className='rounded'>
            <div className='greyed mb-1'></div>
          </div>
        </div>
        <div className='restaurantInfo flex-col'>
          <div className='title w-full text-center text-xxl'>{restaurantDetailInfo.name}</div>
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

        <Slider className='ml-6' {...settings}>
          {_.map(photoUrlArr, (v, i) => (
            <RestaurantPhotoSlideContainer
              key={i}
              photoUrl={v}
              onClick={() => {
                setIsPopUp(true)
                setPopUpImageUrl(v)
              }}
            ></RestaurantPhotoSlideContainer>
          ))}
        </Slider>
        {isPopUp && (
          <PopUpImageContainer
            photoUrl={popUpImageUrl}
            onClick={() => {
              setIsPopUp(false)
            }}
          />
        )}
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
    selectRestaurnatDetail,
    setRestaurantDetailInit,
    setUiIsLoader
  },
  component: RestaurantDetail
})
