export default function getDif(wrap, targetDif) {
  let rect = wrap.getBoundingClientRect()
  let center = {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2,
  }

  let rectTarget = targetDif.getBoundingClientRect()
  let centerTarget = {
    x: rectTarget.x + rectTarget.width / 2,
    y: rectTarget.y + rectTarget.height / 2,
  }
  //console.log(centerTarget)
  let dif = {
    x: center.x - centerTarget.x,
    y: center.y - centerTarget.y,
  }
  return dif
}
