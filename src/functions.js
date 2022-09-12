import { useEffect, useRef } from 'react'

export function getImagesWithAngles(photos) {
  const correction = -127
  const step = 360 / photos.length
  let accumulator = 0
  let map = photos.map((img) => {
    accumulator += step
    return {
      img: img,
      playerAngle: accumulator + correction,
      angleForBottle: accumulator - step,
    }
  })
  //console.log(map)
  return map
}

export function getRandomPlayerNumber(max, target) {
  let min = 0
  let number = target
  while (number == target) {
    let rand = min + Math.random() * (max + 1 - min)
    number = Math.floor(rand)
  }
  return number
}

export function getDif(wrap, targetDif) {
  let rect = wrap.getBoundingClientRect()
  let center = {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2,
  }

  let rectTarget = targetDif.getBoundingClientRect()
  let centerTarget = {
    x: rectTarget.x + rectTarget.width / 2,
    y: rectTarget.y + rectTarget.height / 2,
  }
  //console.log(centerTarget)
  let dif = {
    x: center.x - centerTarget.x,
    y: center.y - centerTarget.y,
  }
  return dif
}

export function getSize() {
  // console.log(window.innerWidth, window.innerHeight)
  const dif = window.innerWidth < window.innerHeight
  //console.log(dif)
  const size = dif ? window.innerWidth : window.innerHeight
  //console.log('size - ', size)
  return size
}

export function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    if (!timer) {
      func.apply(this, args)
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = undefined
    }, timeout)
  }
}

export const useDebounce = (func, timeout = 100) => {
  let timer
  let deferred = () => {
    clearTimeout(timer)
    timer = setTimeout(func, timeout)
  }
  const ref = useRef(deferred)
  return ref.current
}

export const useDebouncedEffect = (func, deps = [], timeout = 100) => {
  useEffect(useDebounce(func, timeout), deps)
}
