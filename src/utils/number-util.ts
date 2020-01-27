export const getNumberUnit = (num: number | string): string => {
  if (!num) {
    return '0'
  }

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
