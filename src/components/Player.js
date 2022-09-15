import React, { useEffect } from 'react'
import wait from '../functions/wait.js'
import getSize from '../functions/getSize.js'

const degToRad = (deg) => {
  return (deg * Math.PI) / 180
}
const getXPlayerCoordinates = (radius, angleRad, size) => {
  return radius * Math.cos(angleRad) + radius - size / 2
}
const getYPlayerCoordinates = (radius, angleRad, size) => {
  return radius * Math.sin(angleRad) + radius - size / 2
}

const Player = ({ number, img, size, photosLength, playerMoveTime }) => {
  const correction = 142
  const radius = (getSize() - getSize() / 5) / 2
  const angle = 360 / photosLength * (number + 1) + correction
  const xc2 = getXPlayerCoordinates(radius, degToRad(angle), size) + size / 2
  const yc2 = getYPlayerCoordinates(radius, degToRad(angle), size) + size / 2

  useEffect(() => {
    const player = document.querySelector(`#player${number}`)
    player.style.width = size + 'px'
    player.style.height = size + 'px'
    player.style.borderRadius = size / 2 + 'px'
    player.style.transition = playerMoveTime + 'ms ease-out'
    player.style.transform = `translate(${yc2}px,${xc2}px)`
    async function resize() {
      let rect = document.querySelector('#wrap').getBoundingClientRect()
      player.style.transform = `translate(${rect.height / 2 - size / 2}px, ${rect.width / 2 - size / 2}px)`
      await wait(playerMoveTime)
      player.style.transform = `translate(${yc2}px,${xc2}px)`
    }
    document.addEventListener(`player${number}`, resize)
    return () => {
      document.removeEventListener(`player${number}`,resize)
    }

  }, [size])


  return (
    <div
      className={'player'}
      id={`player${number}`}
    >
      <img
        className={'player-img'}
        src={'../files/profiles/' + img}
        alt={`player${number}`}
      />
    </div>
  )
}

export default Player
