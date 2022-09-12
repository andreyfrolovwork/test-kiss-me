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
const Player = ({ number, img, size, radius, degree, playerMoveTime }) => {
  const imgpath = '../files/profiles/' + img

  const center = radius
  const degToRad = (deg) => {
    return (deg * Math.PI) / 180
  }

  const angleRad = degToRad(degree)
  const x = radius * Math.cos(angleRad) + center - size / 2
  const y = radius * Math.sin(angleRad) + center - size / 2

  return (
    <PlayerBlock
      playerMoveTime={playerMoveTime}
      id={`player${number}`}
      xc={x}
      yc={y}
      size={size}
    >
      <img className={'player-img'} src={imgpath} alt="" />
    </PlayerBlock>
  )
}

export default Player
