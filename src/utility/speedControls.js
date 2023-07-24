const configs = {
  minSpeed: 1,
  maxSpeed: 100,
  minDelay: 50,
  maxDelay: 1250
}

const medianSpeed = () => Math.round((configs.minSpeed + configs.maxSpeed) / 2)

// take speed 1 to 100 and map to tick delay
const tickDelayFromSpeed = (speed) => {
  const reversedScale = configs.minSpeed + configs.maxSpeed - speed // max is now slowest, min fastest
  const percentOfScale = (reversedScale - configs.minSpeed) / (configs.maxSpeed - configs.minSpeed)
  return Math.round(percentOfScale * configs.maxDelay + configs.minDelay)
}

// take delay from min to max and map to 1 to 100
const speedFromTickDelay = (delay) => {
  const percentOfScale = (delay - configs.minDelay) / configs.maxDelay
  const rescaled = Math.round(
    percentOfScale * (configs.maxSpeed - configs.minSpeed) + configs.minSpeed
  )
  return configs.maxSpeed - rescaled + configs.minSpeed
}

const exports = {
  tickDelayFromSpeed: tickDelayFromSpeed,
  speedFromTickDelay: speedFromTickDelay,
  configs: configs,
  medianSpeed: medianSpeed
}

export default exports