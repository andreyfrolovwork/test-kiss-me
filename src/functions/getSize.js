export default function getSize() {
  const widthGreaterThenHeight = window.innerWidth > window.innerHeight
  return widthGreaterThenHeight ? window.innerHeight : window.innerWidth
}

/*
export function getSize2() {
  const widthGreaterThenHeight = window.innerWidth > window.innerHeight
  if (widthGreaterThenHeight)
    return window.innerHeight
  else
    return window.innerWidth
}
*/



