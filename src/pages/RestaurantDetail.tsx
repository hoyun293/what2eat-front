import {
  IonContent,
  IonHeader,
  IonFooter,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonSlides,
  IonSlide
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

const Marker = ({}: any) => (
  <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
    <IconUi iconName='location-pin' />
  </div>
)

interface IOwnProps {}
interface IStateProps {
  voteForm: IVoteForm
}
interface IDispatchProps {}
interface MatchParams {
  placeId: string
}

const INIT_LATITUDE = 37.4961895
const INIT_LONGITUDE = 127.0253834

const VoteSave: React.FC<IOwnProps & IStateProps & IDispatchProps & RouteComponentProps<MatchParams>> = ({
  match
}) => {
  const [coordinate, setCoordinate] = useState({ lat: INIT_LATITUDE, lng: INIT_LONGITUDE })
  const history = useHistory()
  const slideOpts = {
    initialSlide: 1,
    speed: 400
  }
  useEffect(() => {
    console.log(match.params.placeId)
  }, []) // eslint-disable-line

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='thumbnail w-full'></div>
        <div className='restaurantInfo flex-col'>
          <div className='title w-full text-center text-xxl pt-2'>식당이름</div>
          <div className='rating w-full flex'>
            <ReviewStar className='ratingCenter pt-2' rating={3.6} userRatingsTotal={23}></ReviewStar>
          </div>
          <div className='address flex text-left pt-4'>
            <img className='ml-3' src='/assets/icon/location2.svg' alt='' />
            <div className='flex-col'>
              <div className='addressInBlack ml-3 mr-2'>
                서울 서초구 사평대로 205 센트럴시티 반포천복개비 주차장
              </div>
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
            <div className='numberInBlack ml-3'>02-394-2931</div>
          </div>
        </div>

        <hr className='line mt-7' />
        <div className='map text-base ml-3 mt-5'>지도</div>
        <div className='googleMap mt-3'>
          <GoogleMapReact
            bootstrapURLKeys={{ key: config.GOOGLE_MAP_KEY }}
            defaultCenter={coordinate}
            center={coordinate}
            defaultZoom={15}
            options={{ fullscreenControl: false, zoomControl: false }}
            //  onClick={({ lat, lng }) => setCoordinate({ lat, lng })}
          >
            <Marker lat={coordinate.lat} lng={coordinate.lng} />
          </GoogleMapReact>
        </div>

        <div className='photo mt-3 ml-3 text-base mb-3'>사진</div>
        <IonSlides pager={true} options={slideOpts}>
          <IonSlide>
            <div className='foodPhotoBox flex justify-between ml-5 mr-5'>
              <img className='foodPhoto' src='/assets/img/food-1.jpeg'></img>
              <img className='foodPhoto' src='/assets/img/food-2.jpeg'></img>
              <img
                className='foodPhoto'
                src='https://lh3.googleusercontent.com/p/AF1QipOyNj__s0En169_l0SMJt1gpjDnjueLPzGilG4X=s1600-w400'
              ></img>
            </div>
          </IonSlide>
          <IonSlide>
            <div className='foodPhotoBox flex justify-between ml-5 mr-5'>
              <img className='foodPhoto' src='/assets/img/food-3.jpeg'></img>
              <img className='foodPhoto' src='/assets/img/food-4.jpeg'></img>
              <img className='foodPhoto' src='/assets/img/food-1.jpeg'></img>
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
  mapStateToProps: ({ vote }) => ({
    voteForm: vote.voteForm
  }),
  mapDispatchToProps: {},
  component: VoteSave
})
