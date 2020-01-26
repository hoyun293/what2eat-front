import React, { forwardRef } from 'react'
import moment from 'moment'
import { IonDatetime } from '@ionic/react'

interface IDateTimeProps {
  value?: string
  ref: any
  onChange?: Function
}

const DateTime: React.FunctionComponent<IDateTimeProps> = forwardRef(
  (
    {
      value = moment()
        .add(1, 'day')
        .format('YYYY-MM-DD HH:mm'),
      onChange = () => {}
    },
    ref: any
  ) => {
    return (
      <IonDatetime
        ref={ref}
        displayFormat='MM.DD (DDDD) A hh:mm'
        pickerFormat='YYYY-MMMM-DDDD HH:mm'
        min={moment().format('YYYY-MM-DD')}
        max={moment()
          .add(1, 'month')
          .format('YYYY-MM-DD')}
        monthNames='1월,2월,3월,4월,5월,6월,7월,8월,9월,10월,11월,12월'
        dayNames='일,월,화,수,목,금,토'
        minuteValues='0,15,30,45,59'
        value={value}
        doneText='적용'
        cancelText='취소'
        onIonChange={({ detail }) => onChange(detail.value)}
      ></IonDatetime>
    )
  }
)

export default DateTime
