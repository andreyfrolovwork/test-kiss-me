export default function   rotateBottleToPlayer (num, bottleSpinTime, addedAngle){
  let wheelEl = document.querySelector('#wheel')
  wheelEl.style.transition = `transform ${bottleSpinTime}ms ease-out`
  wheelEl.style.transform = `translate(-50%, -50%) rotate(1440deg)`
}