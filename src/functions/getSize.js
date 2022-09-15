export default function getSize() {
  const widthGreaterThenHeight = window.innerWidth > window.innerHeight
  return widthGreaterThenHeight ? window.innerHeight : window.innerWidth
}
