import moment from 'moment'

moment.locale('ko', {
  months: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
  monthsShort: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
  weekdays: '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
  weekdaysShort: '일_월_화_수_목_금_토'.split('_'),
  weekdaysMin: '일_월_화_수_목_금_토'.split('_'),
  longDateFormat: {
    LT: 'A h:mm',
    LTS: 'A h:mm:ss',
    L: 'YYYY.MM.DD.',
    LL: 'YYYY년 MMMM D일',
    LLL: 'YYYY년 MMMM D일 A h:mm',
    LLLL: 'YYYY년 MMMM D일 dddd A h:mm',
    l: 'YYYY.MM.DD.',
    ll: 'YYYY년 MMMM D일',
    lll: 'YYYY년 MMMM D일 A h:mm',
    llll: 'YYYY년 MMMM D일 dddd A h:mm'
  },
  calendar: {
    sameDay: '오늘 LT',
    nextDay: '내일 LT',
    nextWeek: 'dddd LT',
    lastDay: '어제 LT',
    lastWeek: '지난주 dddd LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: '%s 전',
    past: '%s 전',
    s: '방금',
    ss: '방금',
    m: '1분',
    mm: '%d분',
    h: '1시간',
    hh: '%d시간',
    d: '1일',
    dd: '%d일',
    M: '1개월',
    MM: '%d개월',
    y: '1년',
    yy: '%d년'
  },
  dayOfMonthOrdinalParse: /\d{1,2}(일|월|주)/,
  ordinal: function(number, period) {
    switch (period) {
      case 'd':
      case 'D':
      case 'DDD':
        return number + '일'
      case 'M':
        return number + '월'
      case 'w':
      case 'W':
        return number + '주'
      default:
        return number
    }
  },
  meridiemParse: /오전|오후/,
  isPM: function(token) {
    return token === '오후'
  },
  meridiem: function(hour, minute, isUpper) {
    return hour < 12 ? '오전' : '오후'
  }
})

export default moment
