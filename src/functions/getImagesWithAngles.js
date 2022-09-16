export default function getImagesWithAngles(photos) {
  const step = 360 / photos.length
  let accumulator = 0
  let map = photos.reverse().map((img) => {
    accumulator += step
    return {
      img: img,
      angleForBottle: accumulator - step,
    }
  })

  return map
}
