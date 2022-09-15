import React from 'react'

const Panel = ({ count, rotateBottleToPlayer }) => {
  return (
    <div id={'panel'}>
      <button id={'button'}>
        <span className='shadow'></span>
        <span className='edge'></span>
        <span className='front text'> START</span>
      </button>
      <br />
  {/*    <button onClick={() => {
        let wheelEl = document.querySelector('#wheel')
        wheelEl.style.transition = `transform 1000ms ease-out`
        wheelEl.style.transform = `translate(-50%, -50%) rotate(${
          720
        }deg)`
      }}>ROTATE 0
      </button>
      <br />
      <button onClick={() => {
        let wheelEl = document.querySelector('#wheel')
        wheelEl.style.transition = `transform 1001ms ease-out`
        wheelEl.style.transform = `translate(-50%, -50%) rotate(${
          900
        }deg)`
      }}>ROTATE 1
      </button>
      <br />
      <button onClick={() => {
        let wheelEl = document.querySelector('#wheel')
        wheelEl.style.transition = `none`
        console.log('wheelEl.style.transition = `none`')
        //wheelEl.style.transform = `translate(-50%, -50%))`
      }}>ROTATE 2
      </button>
      <br />
      <button onClick={() => {
        rotateBottleToPlayer(3)
        document.dispatchEvent(new Event(`player${3}`, { bubbles: true }))
      }}>ROTATE 3
      </button>
      <br />
      <button onClick={() => {
        rotateBottleToPlayer(8)
        document.dispatchEvent(new Event(`player${8}`, { bubbles: true }))
      }}>ROTATE 8
      </button>
      <br />
      <button onClick={() => {
        rotateBottleToPlayer(9)
        document.dispatchEvent(new Event(`player${9}`, { bubbles: true }))
      }}>ROTATE 9
      </button>*/}
      <div id={'count'}>count {count}</div>
    </div>
  )
}

export default Panel
