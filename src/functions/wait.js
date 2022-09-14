export default function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
      //console.log('wait ', ms, ' ms')
    }, ms)
  })
}
