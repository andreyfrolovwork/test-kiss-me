import './App.css'
import styled from 'styled-components'
import Player from './components/Player.js'
import { useEffect, useMemo, useState } from 'react'
import Bottle from './components/Bottle.js'
import {
  getDif,
  getImagesWithAngles,
  getRandomPlayerNumber,
  getSize,
} from './functions.js'

import Kiss from './components/Kiss.js'
import spinSound from './images/Spinning sound.mp3'
import kissSound from './images/Kiss sound.mp3'

const Wrapper = styled.div`
  position: relative;
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  //
  // background-color: antiquewhite;

  border-radius: ${(p) => p.size / 2}px;
  //border: 3px solid wheat;
`
const photos = [
  'Regular face 1.png',
  'Regular face 2.png',
  'Regular face 3.png',
  'Regular face 4.png',
  'Regular face 5.png',
  'Regular face 6.png',
  'Regular face 7.png',
  'Regular face 8.png',
  'Regular face 9.png',
  'Regular face 10.png',
]

/*const speedAddedAngle = 3600
const bottleSpinTime = 4000
const kissTime = 500
const playerMoveTime = 300*/
/*const speedAddedAngle = 0
const bottleSpinTime = 100
const kissTime = 500
const playerMoveTime = 300*/

const speedAddedAngle = 1440
const bottleSpinTime = 4000
const kissTime = 500
const playerMoveTime = 300

function App() {
  console.log('app render function')
  const spinAudio = new Audio(spinSound)
  spinAudio.volume = 0.2
  const kissAudio = new Audio(kissSound)

  const [size, setSize] = useState()
  const playerSize = getSize() / 5
  const radius = size / 2

  let images = useMemo(() => getImagesWithAngles(photos), [photos])
  const [angle, setAngle] = useState(0)

  const [beforePlayer, setBeforePlayer] = useState(0)
  const [targetPlayer, setTargetPlayer] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    spinAudio.load()
    kissAudio.load()
    let spinId
    const wheel = document.querySelector('#wheel')
    const startButton = document.querySelector('#button')

    console.log('useEffect')
    setSize(getSize() - getSize() / 5)

    document.querySelector('body').style.padding = getSize() / 10 + 'px'
    document.querySelector(`#bottle`).style.height = getSize() / 3 + 'px'
    document.querySelector('#kiss-img').style.height = getSize() / 3 + 'px'
    document.querySelector('#count').style.fontSize = getSize() / 10 + 'px'
    document.querySelector('#panel').style.marginTop = getSize() / 8 + 'px'

    // если впервый раз
    if (count === 0) {
      document.querySelector(`#player0`).classList.add('selected')
    }

    window.addEventListener('resize', () => {
      console.log('resize')
      setSize(getSize() - getSize() / 5)
      document.querySelector('body').style.padding = getSize() / 10 + 'px'
      document.querySelector(`#bottle`).style.height = getSize() / 3 + 'px'
      document.querySelector('#kiss-img').style.height = getSize() / 3 + 'px'
      document.querySelector('#count').style.fontSize = getSize() / 10 + 'px'
    })

    async function clickListener() {
      console.log('click')

      spinId = setInterval(() => {
        spinAudio.play()
      }, 10)

      console.log(spinId)
      setBeforePlayer(targetPlayer)
      const targetPlayerNumber = getRandomPlayerNumber(
        images.length - 1,
        targetPlayer
      )
      setTargetPlayer(targetPlayerNumber)
      let bottleAngle = targetPlayerNumber * 36
      setAngle(bottleAngle)
      startButton.style.pointerEvents = 'none'
      wheel.style.transition = `all ${bottleSpinTime}ms ease-out`
      let deg = bottleAngle + speedAddedAngle
      wheel.style.transform = `translate(-50%, -50%) rotate(${deg}deg)`
      wheel.classList.add('blur')

      let kiss = document.querySelector('#kiss-img')

      setTimeout(() => {
        clearInterval(spinId)
        console.log(spinId)
        kiss.style.opacity = 1
        //kiss.style.display = 'inherit'
        kiss.style.transition = `all ${kissTime}ms ease-out`
        kiss.style.transform = 'scale(3)'
        setTimeout(() => {
          kiss.style.transform = 'scale(1)'
          setTimeout(() => {
            kiss.style.opacity = 0
            //kiss.style.display = 'none'
          }, kissTime)
        }, kissTime)
      }, bottleSpinTime)

      setCount(count + 1)
    }

    function wheelListener() {
      let target = document.querySelector(`#player${targetPlayer}`)
      let before = document.querySelector(`#player${beforePlayer}`)
      // находим центр wrap
      let wrap = document.querySelector(`#wrap`)

      let difWrap_Target = getDif(wrap, target)
      let difWrap_Before = getDif(wrap, before)
      // находим центр target div

      target.style.transform = `translate(${difWrap_Target.x}px, ${difWrap_Target.y}px) scale(1.5)`
      before.style.transform = `translate(${difWrap_Before.x}px, ${difWrap_Before.y}px) scale(1.5)`
      setTimeout(() => {
        target.style.transform = 'none'
        before.style.transform = 'none'
      }, playerMoveTime)

      target.classList.add('selected')
      before.classList.remove('selected')
      console.log(`Игрок ${beforePlayer} целует ${targetPlayer}`)
      wheel.classList.remove('blur')
      startButton.style.pointerEvents = 'auto'

      const actualDeg = angle % 360
      // Set the real rotation instantly without animation
      wheel.style.transform = `translate(-50%, -50%) rotate(${actualDeg}deg)`
      kissAudio.play()
      wheel.style.transition = 'none'
    }

    startButton.addEventListener('click', clickListener)
    wheel.addEventListener('transitionend', wheelListener)
    return () => {
      wheel.removeEventListener('transitionend', wheelListener)
      startButton.removeEventListener('click', clickListener)
    }
  }, [angle, setAngle])

  return (
    <div className="App">
      <Wrapper id={'wrap'} size={size}>
        <Bottle />
        <Kiss />
        {images.map((im, i) => {
          return (
            <Player
              playerMoveTime={playerMoveTime}
              key={i}
              number={i}
              radius={radius}
              size={playerSize}
              degree={im.playerAngle}
              img={im.img}
            />
          )
        })}
      </Wrapper>
      <div id={'panel'}>
        <button id={'button'}>
          <span className="shadow"></span>
          <span className="edge"></span>
          <span className="front text"> START</span>
        </button>
        <div id={'count'}>count {count}</div>
      </div>
    </div>
  )
}

export default App
