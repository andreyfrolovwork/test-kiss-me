export default function startTimer(tDel) {
  return new Promise((resolve) => {
    let t = document.querySelector('#timer')
    for (let i = 0; i <= 3; i++) {
      t.textContent = String(i)
      t.style.opacity = 1
      setTimeout(() => {
        t.style.transform = 'scale(3)'
        setTimeout(() => {
          t.style.opacity = 0
          setTimeout(() => {
            t.style.transform = 'scale(1)'
            if (i === 3) {
              resolve()
            }
          }, tDel)
        }, tDel)
      }, tDel)
    }
  })
}
