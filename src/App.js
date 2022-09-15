import './App.css'
import './Panel.css'
import './Player.css'
import Player, { degToRad, getXPlayerCoordinates, getYPlayerCoordinates } from './components/Player.js'
import { useEffect, useMemo, useState } from 'react'
import Bottle from './components/Bottle.js'
import getDif from './functions/getDif.js'
import getImagesWithAngles from './functions/getImagesWithAngles.js'
import getRandom from './functions/getRandomPlayerNumber.js'
import getSize, { getSize2, init, resize } from './functions/getSize.js'

import Kiss from './components/Kiss.js'
import spinSound from './files/Spinning sound.mp3'
import kissSound from './files/Kiss sound.mp3'
import Panel from './components/Panel.js'
import Timer from './components/Timer.js'
import startTimer from './functions/startTimer.js'
import wait from './functions/wait.js'
import photos from './functions/photos.js'


/*
const addAngle = 1440
const bottleSpinTime = 4000
const kissTime = 500
const playerMoveTime = 300
const tDel = 200
*/

const addAngle = 0
const bottleSpinTime = 1000
const kissTime = 500
const playerMoveTime = 1000
const tDel = 200

function App() {

  const spinAudio = new Audio(spinSound)
  const kissAudio = new Audio(kissSound)
  spinAudio.volume = 0.3
  const [size, setSize] = useState(getSize() - getSize() / 5)
  const [beforePlayer, setBeforePlayer] = useState(0)
  const [targetPlayer, setTargetPlayer] = useState(0)
  const [angle, setAngle] = useState(0)
  const [count, setCount] = useState(0)
  let images = useMemo(() => getImagesWithAngles(photos), [photos])
  const playerSize = getSize() / 5

  /*
  player -  0 angle - 36
  react_devtools_backend.js:4082 player -  0 angle - 36 // 147 // 0 * 36 = 0
  Player.js:21 player -  1 angle - 72
  react_devtools_backend.js:4082 player -  1 angle - 72 // 110 // 360 - 36 * 1
  Player.js:21 player -  2 angle - 108
  react_devtools_backend.js:4082 player -  2 angle - 108 // 72
  Player.js:21 player -  3 angle - 144
  react_devtools_backend.js:4082 player -  3 angle - 144  // 36
  Player.js:21 player -  4 angle - 180
  react_devtools_backend.js:4082 player -  4 angle - 180 // 0
  Player.js:21 player -  5 angle - 216
  react_devtools_backend.js:4082 player -  5 angle - 216 // 323
  Player.js:21 player -  6 angle - 252
  react_devtools_backend.js:4082 player -  6 angle - 252 // 287
  Player.js:21 player -  7 angle - 288
  react_devtools_backend.js:4082 player -  7 angle - 288 // 251
  Player.js:21 player -  8 angle - 324
  react_devtools_backend.js:4082 player -  8 angle - 324 // 215
  Player.js:21 player -  9 angle - 360
  react_devtools_backend.js:4082 player -  9 angle - 360 // 180 360 - 36 * 1
  */

  function rotateBottleToPlayer (num, bottleSpinTime){
    let wheelEl = document.querySelector('#wheel')
    wheelEl.style.transition = `all ${bottleSpinTime}ms ease-out`
    wheelEl.style.transform = `translate(-50%, -50%) rotate(${
      360 - num * 36
    }deg)`
    console.log('rotate to ', num * 36)
  }

  useEffect(() => {
    init({
      count: count
    })
    resize()
    setSize(getSize() - getSize() / 5)
    //console.log('useEffect')
    spinAudio.load()
    kissAudio.load()
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
/*      wheelEl.style.transition = `all ${bottleSpinTime}ms ease-out`
      wheelEl.style.transform = `translate(-50%, -50%) rotate(90deg)`
      await wait(5000)
      //console.log('after wait 5000')
      wheelEl.style.transform = `translate(-50%, -50%) rotate(180deg)`*/


      panelEl.style.opacity = 0
      await wait(100)
      buttonEl.removeEventListener('click', clickListener)
      startTimer(t, tDel).then(() => {
        spinId = setInterval(() => {
          spinAudio.play()
        }, 600)
        setBeforePlayer(targetPlayer)
        console.log('target',targetPlayer)
        const targetPlayerNumber = getRandom(images.length, targetPlayer)
        setTargetPlayer(targetPlayerNumber)
        //let botlleA = (targetPlayerNumber) * 36 + 180
        setAngle(targetPlayerNumber * 36)
        buttonEl.style.pointerEvents = 'none'
        /*
        wheelEl.style.transition = `all ${bottleSpinTime}ms ease-out`
        wheelEl.style.transform = `translate(-50%, -50%) rotate(${
          botlleA // + addAngle
        }deg)`
        console.log('rotate bottle',botlleA)*/
        rotateBottleToPlayer(targetPlayerNumber,bottleSpinTime)
        wheelEl.classList.add('blur')

        setTimeout(() => {
          clearInterval(spinId)
          //console.log(spinId)
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
      console.log(`#player${targetPlayer}`)
      let target = document.querySelector(`#player${targetPlayer}`)
      let before = document.querySelector(`#player${beforePlayer}`)
      console.log('before target',beforePlayer, targetPlayer)
      document.dispatchEvent(new Event(`player${beforePlayer}`, { bubbles: true }))
      document.dispatchEvent(new Event(`player${targetPlayer}`, { bubbles: true }))
      //toCenter(target)
      /*toCenter(before)*/
      target.classList.add('selected')
      before.classList.remove('selected')
      wheelEl.classList.remove('blur')
      buttonEl.style.pointerEvents = 'auto'
      /*wheelEl.style.transform = `translate(-50%, -50%) rotate(${
        angle % 360
      }deg)`*/
      kissAudio.play()
      wheelEl.style.transition = 'none'
      buttonEl.addEventListener('click', clickListener)
      setTimeout(() => {
        panelEl.style.opacity = 1
      },1000)
    }

    buttonEl.addEventListener('click', clickListener)
    wheelEl.addEventListener('transitionend', wheelListener)
    window.addEventListener('resize', onResize)

    return () => {
      wheelEl.removeEventListener('transitionend', wheelListener)
      buttonEl.removeEventListener('click', clickListener)
      window.removeEventListener('resize', onResize)
    }
  }, [angle, setAngle])

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
          <Panel rotateBottleToPlayer={rotateBottleToPlayer} count={count} />
        </div>
      </div>
    </div>
  )
}

export default App
