import wait from './wait.js'

const tArr = ['3', '2', '1']

export default function startTimer(t, tDel) {
  return new Promise(async (resolve) => {
    for (const el of tArr) {
      const i = tArr.indexOf(el)
      t.textContent = String(el)
      t.style.opacity = 1
      await wait(tDel)
      t.style.transform = 'translate(-50%, -50%) scale(3)'
      await wait(tDel)
      t.style.opacity = 0
      t.style.transform = 'translate(-50%, -50%) scale(1)'
      await wait(tDel)
      if (i === 2) {
        resolve()
      }
    }
  })
}
