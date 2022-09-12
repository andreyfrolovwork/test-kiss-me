import React from 'react'

const Bottle = () => {
  //console.log('rerender bottle')
  return (
    <div className={'bottle-block'} id={'wheel'}>
      {/*      <div className={'quad'}></div>*/}
      <img
        className={'bottle-img'}
        id={'bottle'}
        src={'../files/Bottle.png'}
        alt=""
      />
    </div>
  )
}

export default Bottle
