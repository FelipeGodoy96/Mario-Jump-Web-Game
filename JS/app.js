// --- VARIÁVEIS GLOBAIS --- //
var gameRunning = true
// --- --- --- --- --- --- --- //

// --- CONSTANTES GLOBAIS --- //

const mario = document.querySelector('.mario')
const clouds = document.querySelector('.clouds')
const pipe = document.querySelector('.pipe')
const score = document.querySelector('.score')

// --- --- --- --- --- --- --- //

// --- FUNÇÕES --- //

const jump = () => {
  if (gameRunning) {
    mario.classList.add('jump')
    const jumpSound = new Audio('./Audio/mario-jump.mp3')
    jumpSound.volume = 0.15
    jumpSound.play()
    setTimeout(() => {
      mario.classList.remove('jump')
    }, 650)
  }
}

const death = () => {
  if (gameRunning) {
    const deathSound = new Audio('./Audio/mario-death.mp3')
    deathSound.volume = 0.15
    deathSound.play()
    if (mario.classList.contains('jump')) {
      mario.classList.remove('jump')
    }
    setInterval(() => {
      mario.classList.add('death')
      setInterval(() => {
        mario.style.display = 'none'
      }, 800)
    }, 700)
  }
}

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft
  const cloudsPosition = clouds.offsetLeft
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')
  if (pipePosition <= 122 && pipePosition > 0 && marioPosition < 100) {
    pipe.style.animation = 'none'
    pipe.style.left = `${pipePosition}px`
    clouds.style.animation = 'none'
    clouds.style.left = `${cloudsPosition}px`
    mario.src = './Imgs/game-over.png'
    mario.style.bottom = `${marioPosition}px`
    mario.style.width = '70px'
    mario.style.marginLeft = '50px'
    clearInterval(loop)
    death()
    gameRunning = false
    Swal.fire({
      title: 'You died!',
      text: 'Do you want to play again?',
      icon: 'error',
      confirmButtonText: 'Yes'
    })
  }
}, 10)

document.addEventListener('keydown', e => {
  e.preventDefault()
  if (gameRunning) {
    if (e.key == ' ') {
      jump()
    }
  }
  if (e.key == 'F5') {
    location.reload()
  }
})

var scoreNumber = 0

const scoreGainer = setInterval(() => {
  if (gameRunning) {
    score.textContent = scoreNumber
    scoreNumber += 50
  }
}, 500)

// --- --- --- --- --- --- --- //

// --- --- --- --- --- --- --- //
