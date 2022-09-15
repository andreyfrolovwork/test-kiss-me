import React from 'react'

const Panel = ({ count }) => {
  return (
    <div id={'panel'}>
      <button id={'button'}>
        <span className='shadow'></span>
        <span className='edge'></span>
        <span className='front text'> START</span>
      </button>
      <div id={'count'}>count {count}</div>
    </div>
  )
}

export default Panel
