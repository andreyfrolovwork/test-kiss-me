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
      <button onClick={() => {
        rotateBottleToPlayer(0)
        document.dispatchEvent(new Event(`player${0}`, { bubbles: true }))
      }}>ROTATE 0
      </button>
      <br />
      <button onClick={() => {
        rotateBottleToPlayer(1)
        document.dispatchEvent(new Event(`player${1}`, { bubbles: true }))
      }}>ROTATE 1
      </button>
      <br />
      <button onClick={() => {
        rotateBottleToPlayer(2)
        document.dispatchEvent(new Event(`player${2}`, { bubbles: true }))
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
      </button>
      <div id={'count'}>count {count}</div>
    </div>
  )
}

export default Panel
