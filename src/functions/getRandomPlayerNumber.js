export default function getRandomPlayerNumber(max, target) {
  let min = 0
  let number = target
  while (number === target) {
    let rand = min + Math.random() * (max - 1 - min)
    number = Math.floor(rand)
  }
  return number
}
