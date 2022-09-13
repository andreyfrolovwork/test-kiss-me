export default function getSize() {
  // console.log(window.innerWidth, window.innerHeight)
  const dif = window.innerWidth < window.innerHeight
  //console.log(dif)
  const size = dif ? window.innerWidth : window.innerHeight
  //console.log('size - ', size)
  return size
}
