import './App.css'
import './Panel.css'
import './Player.css'
import Player from './components/Player.js'
import { useEffect, useMemo, useState } from 'react'
import Bottle from './components/Bottle.js'
import getImagesWithAngles from './functions/getImagesWithAngles.js'
import getRandom from './functions/getRandomPlayerNumber.js'
import getSize from './functions/getSize.js'

import Kiss from './components/Kiss.js'
import spinSound from './files/Spinning sound.mp3'
import kissSound from './files/Kiss sound.mp3'
import Panel from './components/Panel.js'
import Timer from './components/Timer.js'
import startTimer from './functions/startTimer.js'
import wait from './functions/wait.js'
import photos from './functions/photos.js'
import resize from './functions/resize.js'
import init from './functions/init.js'

const addedAngle = 1440
const bottleSpinTime = 4000
const kissTime = 500
const playerMoveTime = 1000
const tDel = 200

function App() {
  const spinAudio = new Audio(spinSound)
  const kissAudio = new Audio(kissSound)
  spinAudio.volume = 0.1
  const [size, setSize] = useState(getSize() - getSize() / 5)
  const [beforePlayer, setBeforePlayer] = useState(0)
  const [targetPlayer, setTargetPlayer] = useState(0)
  const [angle, setAngle] = useState(0)
  const [count, setCount] = useState(0)
  let images = useMemo(() => getImagesWithAngles(photos), [photos])
  const playerSize = getSize() / 5

  useEffect(() => {
    init({
      count: count
    })
    resize()
    setSize(getSize() - getSize() / 5)
    let spinId
    let wheelEl = document.querySelector('#wheel')
    let buttonEl = document.querySelector('#button')
    let bottleEl = document.querySelector(`#bottle`)
    let kissImgEl = document.querySelector('#kiss-img')
    let countEl = document.querySelector('#count')
    let t = document.querySelector('#timer')
    let panelEl = document.querySelector('#panel')
    bottleEl.style.height = getSize() / 3 + 'px'
    kissImgEl.style.height = getSize() / 3 + 'px'
    countEl.style.fontSize = getSize() / 10 + 'px'

    function onResize() {
      resize()
      setSize(getSize() - getSize() / 5)
    }

    async function clickListener() {
      panelEl.style.opacity = 0
      await wait(100)
      await startTimer(t, tDel)
      spinId = setInterval(() => {
        spinAudio.play()
      }, 600)
      setBeforePlayer(targetPlayer)
      const targetPlayerNumber = getRandom(images.length, targetPlayer)
      setTargetPlayer(targetPlayerNumber)
      setAngle(targetPlayerNumber * 36)
      buttonEl.style.pointerEvents = 'none'
      wheelEl.style.transition = `transform ${bottleSpinTime}ms ease-out`
      wheelEl.style.transform = `translate(-50%, -50%) rotate(${
        360 - targetPlayerNumber * 36 + addedAngle
      }deg)`

      wheelEl.classList.add('blur')
      await wait(bottleSpinTime)
      clearInterval(spinId)
      kissImgEl.style.opacity = 1
      kissImgEl.style.transition = `all ${kissTime}ms ease-out`
      kissImgEl.style.transform = 'scale(3)'
      await wait(kissTime)
      kissImgEl.style.transform = 'scale(1)'
      await wait(kissTime)
      setCount(count + 1)
      kissImgEl.style.opacity = 0
    }

    async function wheelListener() {
      let target = document.querySelector(`#player${targetPlayer}`)
      let before = document.querySelector(`#player${beforePlayer}`)
      document.dispatchEvent(new Event(`player${beforePlayer}`, { bubbles: true }))
      document.dispatchEvent(new Event(`player${targetPlayer}`, { bubbles: true }))
      target.classList.add('selected')
      before.classList.remove('selected')
      wheelEl.classList.remove('blur')
      buttonEl.style.pointerEvents = 'auto'
      wheelEl.style.transition = 'none'
      wheelEl.style.transform = `translate(-50%, -50%) rotate(${
        360 - targetPlayer * 36
      }deg)`
      kissAudio.play()
      await wait(1000)
      panelEl.style.opacity = 1
    }

    buttonEl.addEventListener('click', clickListener)
    wheelEl.addEventListener('transitionend', wheelListener)
    window.addEventListener('resize', onResize)

    return () => {
      wheelEl.removeEventListener('transitionend', wheelListener)
      buttonEl.removeEventListener('click', clickListener)
      window.removeEventListener('resize', onResize)
    }
  }, [size,angle, count])

  const Players = images.map((im, i, arr) => {
    return (
      <Player
        playerMoveTime={playerMoveTime}
        key={i}
        number={i}
        size={playerSize}
        img={im.img}
        photosLength={arr.length}
      />
    )
  })

  return (
    <div className='App'>
      <div className={'outsideWrapper'}>
        <div id={'wrap'}>
          <Timer />
          <Bottle />
          <Kiss />
          {Players}
          <Panel count={count} />
        </div>
      </div>
    </div>
  )
}

export default App
