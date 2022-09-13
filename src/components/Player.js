import React from 'react'
import styled from 'styled-components'

const PlayerBlock = styled.div`
  position: absolute;
  left: ${(p) => p.xc}px;
  top: ${(p) => p.yc}px;
  clear: both;
  float: left;
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  overflow: hidden;
  border-radius: ${(p) => p.size / 2}px;
  background: #282828;
  transition: all ${(p) => p.playerMoveTime}ms ease-out;
`
const degToRad = (deg) => {
  return (deg * Math.PI) / 180
}
const getXPlayerCoordinates = (radius, angleRad, size) => {
  return radius * Math.cos(angleRad) + radius - size / 2
}
const getYPlayerCoordinates = (radius, angleRad, size) => {
  return radius * Math.sin(angleRad) + radius - size / 2
}

const Player = ({ number, img, size, radius, degree, playerMoveTime }) => {
  return (
    <PlayerBlock
      playerMoveTime={playerMoveTime}
      id={`player${number}`}
      xc={getXPlayerCoordinates(radius, degToRad(degree), size)}
      yc={getYPlayerCoordinates(radius, degToRad(degree), size)}
      size={size}
    >
      <img
        className={'player-img'}
        src={'../files/profiles/' + img}
        alt={`player${number}`}
      />
    </PlayerBlock>
  )
}

export default Player
