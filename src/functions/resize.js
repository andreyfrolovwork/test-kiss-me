import getSize from './getSize.js'

export default function resize(){
  const tw = document.querySelector('#wrap')
  tw.style.width = getSize() + 'px'
  tw.style.height = getSize()  + 'px'

  let bottleEl = document.querySelector(`#bottle`)
  let kissImgEl = document.querySelector('#kiss-img')
  let countEl = document.querySelector('#count')
  bottleEl.style.height = getSize() / 3 + 'px'
  kissImgEl.style.height = getSize() / 3 + 'px'
  countEl.style.fontSize = getSize() / 10 + 'px'

}