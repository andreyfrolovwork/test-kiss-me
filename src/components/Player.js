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
  const correction = -127
  const radius = (getSize() - getSize() / 5) / 2
  const angle = 360 / photosLength * (number + 1) + 142
  //console.log('player - ', number, 'angle -', angle)
  const xc2 = getXPlayerCoordinates(radius, degToRad(angle), size) + size / 2
  const yc2 = getYPlayerCoordinates(radius, degToRad(angle), size) + size / 2

  useEffect(() => {
    //console.log('use player')
    const player = document.querySelector(`#player${number}`)
    player.style.width = size + 'px'
    player.style.height = size + 'px'
    player.style.borderRadius = size / 2 + 'px'
    player.style.transition = playerMoveTime + 'ms ease-out'
    player.style.transform = `translate(${yc2}px,${xc2}px)`
    document.addEventListener(`player${number}`, async () => {

      let rect = document.querySelector('#wrap').getBoundingClientRect()
      player.style.transform = `translate(${rect.height / 2 - size / 2}px, ${rect.width / 2 - size / 2}px)`
      await wait(playerMoveTime)
      player.style.transform = `translate(${yc2}px,${xc2}px)`
    })

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
