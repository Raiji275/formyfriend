const game = document.body,
    scoreEl = document.getElementById('score'),
    popSound = document.getElementById("popSound");

const generateRgb = () => Math.floor(Math.random() * 256)

const generateColor = () => `rgb(${generateRgb()},${generateRgb()},${generateRgb()})`

const popBalloon = event => {
    event.stopPropagation()
    const balloon = event.target
    popSound.play()
    deleteBalloon(balloon)
    updateScore(10)
}

const deleteBalloon = balloon => {
    balloon.removeEventListener('click', popBalloon)
    balloon.removeEventListener('transitionend', deleteBalloon)
    balloon.parentNode.removeChild(balloon)
}
const styleBalloon = () => {
    const color = generateColor()
    const placement = Math.floor(Math.random() * 90)
    return `background: ${color}; color: ${color}; left: ${placement}%`
}

const addBalloon = () => {
    let balloon = document.createElement('div')
    balloon.classList.add('balloon')
    balloon.classList.add(['two', 'three', 'four'][Math.floor(Math.random() * 3)])
    balloon.setAttribute('style', styleBalloon())
    balloon.addEventListener('mousedown', popBalloon)
    balloon.addEventListener('transitionend', balloonWentOffScreen)
    game.appendChild(balloon)
    window.getComputedStyle(balloon).opacity
    balloon.classList.add('going-up')
}

const balloonWentOffScreen = event => {
    updateScore(-2)
    deleteBalloon(event.target)
}

const updateScore = score => {
    let currentScore = scoreEl.innerText * 1
    let newScore = currentScore + +score
    scoreEl.innerText = newScore
}
setInterval(() => addBalloon(), Math.random() * 500 + 500)

