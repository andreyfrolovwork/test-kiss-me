export default function getImagesWithAngles(photos) {
  const correction = -127
  const step = 360 / photos.length
  let accumulator = 0
  let map = photos.map((img) => {
    accumulator += step
    return {
      img: img,
      playerAngle: accumulator + correction,
      angleForBottle: accumulator - step,
    }
  })
  //console.log(map)
  return map
}
