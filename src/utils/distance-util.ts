export const getDistanceByCordinate = ({
  latitude,
  longitude,
  nowLatitude,
  nowLongitude
}: {
  latitude: number
  longitude: number
  nowLatitude: number
  nowLongitude: number
}) => {
  var R = 6378.137 // Radius of earth in KM
  var dLat = (nowLatitude * Math.PI) / 180 - (latitude * Math.PI) / 180
  var dLon = (nowLongitude * Math.PI) / 180 - (longitude * Math.PI) / 180
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((latitude * Math.PI) / 180) *
      Math.cos((nowLatitude * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c
  return (d * 1000).toFixed(0)
}
