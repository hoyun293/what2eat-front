import React, { useEffect, useState } from 'react'
import * as _ from 'lodash'
import config from '../config'

import { connect } from '../redux/redux-connect'
import { getAddressByCoordinate } from '../api/google-api'
import { Plugins } from '@capacitor/core'
import { IVoteForm } from '../models/vote'
import {
  setVoteInsertForm,
  selectVotePlaces,
  deleteVoteInsertPlace,
  setVoteInsertPlace
} from '../redux/vote-insert/vote-insert-actions'
import IconUi from '../components/ui/IconUi'
import {
  IonContent,
  IonModal,
  IonPopover,
  IonFab,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRippleEffect
} from '@ionic/react'
import VotePlaceItem from '../components/VotePlaceItem'

import './VoteSaveFormFoodCartContainer.scss'
import GoogleMapReact from 'google-map-react'
import { IPlace } from '../models/place'
import { getDistanceByCordinate } from '../utils/distance-util'
import { setUiIsLoader } from '../redux/ui/ui-actions'

// eslint-disable-next-line
const Marker = ({}: any) => (
  <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
    <IconUi iconName='location-pin' />
  </div>
)

interface IOwnProps {}
interface IStateProps {
  voteForm: IVoteForm
  originVotePlaceIds: Array<string>
  votePlaces: IPlace[]
  pagetoken: string
  disableVotePlacesInfiniteScroll: boolean
}
interface IDispatchProps {
  setVoteInsertForm: typeof setVoteInsertForm
  selectVotePlaces: typeof selectVotePlaces
  setVoteInsertPlace: typeof setVoteInsertPlace
  deleteVoteInsertPlace: typeof deleteVoteInsertPlace
  setUiIsLoader: typeof setUiIsLoader
}

const INIT_LATITUDE = 37.4961895
const INIT_LONGITUDE = 127.0253834

const VoteSaveFormFoodCartContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  voteForm,
  votePlaces,
  disableVotePlacesInfiniteScroll,
  setVoteInsertForm,
  originVotePlaceIds,
  pagetoken,
  selectVotePlaces,
  setVoteInsertPlace,
  deleteVoteInsertPlace,
  setUiIsLoader
}) => {
  const [address, setAddress] = useState('????????? ???????????????...')
  const [isShowModal, setIsShowModal] = useState(false)
  const [isShowCartModal, setIsShowCartModal] = useState(false)
  const [isLoadingShowCartModal, setIsLoadingShowCartModal] = useState(false)
  const [filterDistance, setFilterDistance] = useState(1000)
  const [rankby, setRankBy] = useState({ label: '?????????', value: 'distance' })
  const [index, setIndex] = useState(0)
  const [coordinate, setCoordinate] = useState({ lat: INIT_LATITUDE, lng: INIT_LONGITUDE })
  const [tempCoordinate, setTempCoordinate] = useState({ lat: INIT_LATITUDE, lng: INIT_LONGITUDE })
  const [tempAddress, setTempAddress] = useState('')

  useEffect(() => {
    getCurrentPosition()
    setUiIsLoader(true)
    setIndex(index + 1)
  }, []) // eslint-disable-line

  useEffect(() => {
    if (index >= 1) {
      setUiIsLoader(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [votePlaces])
  useEffect(() => {
    if (coordinate.lat === INIT_LATITUDE) return
    getAddress(coordinate.lat, coordinate.lng)

    selectVotePlaces({
      latitude: coordinate.lat,
      longitude: coordinate.lng,
      rankby: rankby.value,
      radius: filterDistance
    })
  }, [coordinate, rankby, filterDistance]) // eslint-disable-line

  useEffect(() => {
    if (isShowModal === true) {
      setTempCoordinate(coordinate)
      getTempAddress(coordinate.lat, coordinate.lng)
    }
  }, [isShowModal])

  useEffect(() => {
    getTempAddress(tempCoordinate.lat, tempCoordinate.lng)
  }, [tempCoordinate])
  const getCurrentPosition = async () => {
    try {
      const { coords } = await Plugins.Geolocation.getCurrentPosition()
      setCoordinate({ lat: coords.latitude, lng: coords.longitude })
    } catch (e) {
      setCoordinate({ lat: 37.4961895, lng: 127.0253834 })
    }
  }
  const getTempCurrentPosition = async () => {
    try {
      const { coords } = await Plugins.Geolocation.getCurrentPosition()
      setTempCoordinate({ lat: coords.latitude, lng: coords.longitude })
    } catch (e) {
      setTempCoordinate({ lat: 37.4961895, lng: 127.0253834 })
    }
  }
  const getAddress = async (latitude: number, longitude: number) => {
    const { data }: any = await getAddressByCoordinate(latitude, longitude)
    setAddress(_.get(data.results, '[0].formatted_address'))
  }

  const getTempAddress = async (latitude: number, longitude: number) => {
    const { data }: any = await getAddressByCoordinate(latitude, longitude)
    setTempAddress(_.get(data.results, '[0].formatted_address'))
  }
  const toggleSortBy = () => {
    switch (rankby.value) {
      case 'distance':
        setRankBy({ label: '?????????', value: 'prominence' })
        break
      case 'prominence':
        setRankBy({ label: '?????????', value: 'distance' })
        break
    }
  }

  async function searchNext($event: CustomEvent<void>) {
    await selectVotePlaces({
      latitude: coordinate.lat,
      longitude: coordinate.lng,
      rankby: rankby.value,
      radius: filterDistance,
      pagetoken
    })

    _.invoke($event.target, 'complete')
  }
  return (
    <IonContent>
      <div className='px-container pt-4'>
        <div
          className='text-xxl text-bold flex items-center ion-activatable ripple-parent'
          onClick={() => {
            setIsShowModal(true)
            setUiIsLoader(true)
          }}
        >
          <IonRippleEffect></IonRippleEffect>
          <div className='ellipsis'>{address}</div>
          {coordinate.lat !== 0 && (
            <IconUi className='iconLocation ml-2 height-30' iconName='location'></IconUi>
          )}
        </div>
        <div className='flex items-center justify-between mt-3'>
          <div className='filter-btn flex-center text-lg m-black'>
            <IonLabel>
              <IconUi iconName='filter' className='iconFilter pr-1'></IconUi>
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
            <IconUi iconName='sort' className='iconSort pt-1 pr-1'></IconUi> {rankby.label}
          </div>
        </div>

        <div className='pt-8'>
          {_.map(votePlaces, (v, i) => (
            <VotePlaceItem
              key={i}
              placeId={v.placeId}
              name={v.name}
              rating={v.rating}
              userRatingsTotal={v.userRatingsTotal}
              distance={getDistanceByCordinate({
                latitude: v.lat,
                longitude: v.lng,
                nowLatitude: coordinate.lat,
                nowLongitude: coordinate.lng
              })}
              photoUrl={v.photoUrl}
              isAdded={voteForm?.votePlaces?.hasOwnProperty(v.placeId)}
              isReadOnly={originVotePlaceIds.indexOf(v.placeId) > -1}
              onClickItem={
                voteForm?.votePlaces?.hasOwnProperty(v.placeId) ? deleteVoteInsertPlace : setVoteInsertPlace
              }
            ></VotePlaceItem>
          ))}
        </div>
        <IonInfiniteScroll
          threshold='100px'
          disabled={disableVotePlacesInfiniteScroll}
          onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}
        >
          <IonInfiniteScrollContent loadingText='???????????? ???????????? ????????????.'></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </div>

      <IonModal isOpen={isShowModal} onWillPresent={() => setUiIsLoader(false)}>
        <div style={{ height: '100vh', width: '100%' }}>
          <IconUi className='back-btn' iconName='left-arrow' onClick={() => setIsShowModal(false)}></IconUi>

          <div className='map-container reload-btn-container'>
            <IconUi
              className='reload-btn'
              iconName='location-reload'
              onClick={() => getTempCurrentPosition()}
            ></IconUi>
          </div>
          <div className='map-container address-container'>{tempAddress}</div>
          <div
            className='map-container address-btn'
            onClick={() => {
              setCoordinate(tempCoordinate)
              setIsShowModal(false)
            }}
          >
            ????????? ????????? ??????
          </div>

          <GoogleMapReact
            bootstrapURLKeys={{ key: config.GOOGLE_MAP_KEY }}
            defaultCenter={tempCoordinate}
            center={tempCoordinate}
            defaultZoom={15}
            options={{ fullscreenControl: false, zoomControl: false }}
            onClick={({ lat, lng }) => setTempCoordinate({ lat, lng })}
          >
            <Marker lat={tempCoordinate.lat} lng={tempCoordinate.lng} />
          </GoogleMapReact>
        </div>
      </IonModal>

      <IonPopover
        isOpen={isShowCartModal}
        onWillPresent={() => setIsLoadingShowCartModal(false)}
        onDidDismiss={() => setIsShowCartModal(false)}
        cssClass='cart-list-modal'
      >
        <div>
          <div className='cart-list-modal__header flex-center text-xl black text-bold'>????????? ?????????</div>
          <div className='flex-col min-h-100 max-h-half-screen overflow-auto'>
            {_.map(voteForm.votePlaces, v => (
              <div className='flex justify-between py-2 px-4' key={v.placeId}>
                <div className='flex items-center'>
                  <div
                    className='thumb-container'
                    style={{
                      backgroundImage: `url(${v.photoUrl || '/assets/img/list-place-thumb-empty.svg'})`,
                      backgroundSize: v.photoUrl ? 'cover' : 'initial'
                    }}
                  ></div>
                  <div className='pl-3'>{v.name}</div>
                </div>
                {originVotePlaceIds.indexOf(v.placeId) === -1 && (
                  <IconUi onClick={() => deleteVoteInsertPlace(v)} iconName='remove-btn'></IconUi>
                )}
              </div>
            ))}
          </div>
          <div
            onClick={() => setIsShowCartModal(false)}
            className='purple text-sm flex-center cart-list-modal__confirm-btn mt-4'
          >
            ??????
          </div>
        </div>
      </IonPopover>

      <IonFab
        className='cart-list__container'
        vertical='bottom'
        horizontal='end'
        slot='fixed'
        edge={false}
        onClick={() => {
          setIsShowCartModal(true)
          setIsLoadingShowCartModal(true)
        }}
      >
        <div className='flex-center cart-list__btn'>
          <IconUi
            iconName='cart-list'
            className='iconCartList pt-1'
            isLoading={isLoadingShowCartModal}
          ></IconUi>
        </div>
      </IonFab>
    </IonContent>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ voteInsert, voteDetail, ui }) => ({
    voteForm: voteInsert.voteForm, // ????????????
    votePlaces: voteInsert.votePlaces, // ?????? ?????? ????????? ?????????
    pagetoken: voteInsert.pagetoken,
    originVotePlaceIds: voteDetail.vote.votePlaces.map(v => v.placeId),
    disableVotePlacesInfiniteScroll: voteInsert.disableVotePlacesInfiniteScroll,
    uiIsLoader: ui.isLoader
  }),
  mapDispatchToProps: {
    setVoteInsertForm,
    selectVotePlaces,
    deleteVoteInsertPlace,
    setVoteInsertPlace,
    setUiIsLoader
  },
  component: VoteSaveFormFoodCartContainer
})
