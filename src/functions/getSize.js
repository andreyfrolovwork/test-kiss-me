export default function getSize() {
  // console.log(window.innerWidth, window.innerHeight)
  const dif = window.innerWidth < window.innerHeight
  //console.log(dif)
  const size = dif ? window.innerWidth : window.innerHeight
  //console.log('size - ', size)
  return size
}

export function getSize2() {
  //console.log('w - ',window.innerWidth, 'h - ', window.innerHeight)
  const widthGreaterThenHeight = window.innerWidth > window.innerHeight

  if (widthGreaterThenHeight)
    return window.innerHeight
  else
    return window.innerWidth

}

export function resize(){
  const tw = document.querySelector('#wrap')
  tw.style.width = getSize2() + 'px'
  tw.style.height = getSize2()  + 'px'

  let bottleEl = document.querySelector(`#bottle`)
  let kissImgEl = document.querySelector('#kiss-img')
  let countEl = document.querySelector('#count')
  bottleEl.style.height = getSize2() / 3 + 'px'
  kissImgEl.style.height = getSize2() / 3 + 'px'
  countEl.style.fontSize = getSize2() / 10 + 'px'

}

export function init(obj){
  if (obj.count === 0) {
    document.querySelector(`#player0`).classList.add('selected')
  }
}