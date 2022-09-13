import './App.css'
import styled from 'styled-components'
import Player from './components/Player.js'
import { useEffect, useMemo, useState } from 'react'
import Bottle from './components/Bottle.js'
import getDif from './functions/getDif.js'
import getImagesWithAngles from './functions/getImagesWithAngles.js'
import getRandom from './functions/getRandomPlayerNumber.js'
import getSize from './functions/getSize.js'

import Kiss from './components/Kiss.js'
import spinSound from './files/Spinning sound.mp3'
import kissSound from './files/Kiss sound.mp3'
import Panel from './components/Panel.js'
import Timer from './components/Timer.js'
import startTimer, { wait } from './functions/startTimer.js'

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

const Wrapper = styled.div`
  position: relative;
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  border-radius: ${(p) => p.size / 2}px;
`

const addAngle = 1440
const bottleSpinTime = 4000
const kissTime = 500
const playerMoveTime = 300
const tDel = 200

function App() {
  const spinAudio = new Audio(spinSound)
  const kissAudio = new Audio(kissSound)
  spinAudio.volume = 0.2

  const [size, setSize] = useState()
  const [beforePlayer, setBeforePlayer] = useState(0)
  const [targetPlayer, setTargetPlayer] = useState(0)
  const [angle, setAngle] = useState(0)
  const [count, setCount] = useState(0)

  let images = useMemo(() => getImagesWithAngles(photos), [photos])
  const playerSize = getSize() / 5
  const radius = size / 2

  useEffect(() => {
    console.log('useEffect')
    spinAudio.load()
    kissAudio.load()
    let spinId
    let wheelEl = document.querySelector('#wheel')
    let buttonEl = document.querySelector('#button')
    let bodyEl = document.querySelector('body')
    let bottleEl = document.querySelector(`#bottle`)
    let kissImgEl = document.querySelector('#kiss-img')
    let countEl = document.querySelector('#count')
    let panelEl = document.querySelector('#panel')
    let t = document.querySelector('#timer')
    setSize(getSize() - getSize() / 5)
    bodyEl.style.padding = getSize() / 10 + 'px'
    bottleEl.style.height = getSize() / 3 + 'px'
    kissImgEl.style.height = getSize() / 3 + 'px'
    countEl.style.fontSize = getSize() / 10 + 'px'
    panelEl.style.marginTop = getSize() / 8 + 'px'

    if (count === 0) {
      document.querySelector(`#player0`).classList.add('selected')
    }

    function onResize() {
      console.log('resize')
      setSize(getSize() - getSize() / 5)
      bodyEl.style.padding = getSize() / 10 + 'px'
      bottleEl.style.height = getSize() / 3 + 'px'
      kissImgEl.style.height = getSize() / 3 + 'px'
      countEl.style.fontSize = getSize() / 10 + 'px'
    }

    async function clickListener() {
      console.log('click')
      startTimer(t, tDel).then(() => {
        console.log('then')
        spinId = setInterval(() => {
          spinAudio.play()
        }, 100)
        setBeforePlayer(targetPlayer)
        const targetPlayerNumber = getRandom(images.length, targetPlayer)
        setTargetPlayer(targetPlayerNumber)
        let botlleA = targetPlayerNumber * 36
        setAngle(botlleA)
        buttonEl.style.pointerEvents = 'none'
        wheelEl.style.transition = `all ${bottleSpinTime}ms ease-out`
        wheelEl.style.transform = `translate(-50%, -50%) rotate(${
          botlleA + addAngle
        }deg)`
        wheelEl.classList.add('blur')

        setTimeout(() => {
          clearInterval(spinId)
          console.log(spinId)
          kissImgEl.style.opacity = 1
          kissImgEl.style.transition = `all ${kissTime}ms ease-out`
          kissImgEl.style.transform = 'scale(3)'
          setTimeout(() => {
            kissImgEl.style.transform = 'scale(1)'
            setTimeout(() => {
              kissImgEl.style.opacity = 0
            }, kissTime)
          }, kissTime)
        }, bottleSpinTime)
        setCount(count + 1)
      })
    }

    function wheelListener() {
      let target = document.querySelector(`#player${targetPlayer}`)
      let before = document.querySelector(`#player${beforePlayer}`)
      let wrap = document.querySelector(`#wrap`)

      let difWrap_Target = getDif(wrap, target)
      let difWrap_Before = getDif(wrap, before)

      target.style.transform = `translate(${difWrap_Target.x}px, ${difWrap_Target.y}px) scale(1.5)`
      before.style.transform = `translate(${difWrap_Before.x}px, ${difWrap_Before.y}px) scale(1.5)`

      setTimeout(() => {
        target.style.transform = 'none'
        before.style.transform = 'none'
      }, playerMoveTime)

      target.classList.add('selected')
      before.classList.remove('selected')
      wheelEl.classList.remove('blur')
      buttonEl.style.pointerEvents = 'auto'
      wheelEl.style.transform = `translate(-50%, -50%) rotate(${
        angle % 360
      }deg)`
      kissAudio.play()
      wheelEl.style.transition = 'none'
    }

    window.addEventListener('resize', onResize)
    buttonEl.addEventListener('click', clickListener)
    wheelEl.addEventListener('transitionend', wheelListener)
    return () => {
      wheelEl.removeEventListener('transitionend', wheelListener)
      buttonEl.removeEventListener('click', clickListener)
      window.removeEventListener('resize', onResize)
    }
  }, [angle, setAngle])

  const Players = images.map((im, i) => {
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
  })

  return (
    <div className="App">
      <Wrapper id={'wrap'} size={size}>
        <Timer />
        <Bottle />
        <Kiss />
        {Players}
      </Wrapper>
      <Panel count={count} />
    </div>
  )
}

export default App
