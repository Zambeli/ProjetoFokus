const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const imagem = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const inputMusic = document.querySelector('#alternar-musica')

const alarme = new Audio('sons/beep.mp3')
const pauseBt = new Audio('/sons/pause.mp3')
const playBt = new Audio('/sons/play.wav')
const music = new Audio('/sons/luna-rise-part-one.mp3')
music.loop = true

let tempoDecorridoEmSegundos = 5
let intervaloId = null

inputMusic.addEventListener('change', () => {
    if (music.paused) {
        music.play()
    } else {
        music.pause()
    }
})

focoBt.addEventListener('click', () => {
    AlterarAtributos('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    AlterarAtributos('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    AlterarAtributos('descanso-longo')
    longoBt.classList.add('active')
})

function AlterarAtributos (atributo) {
    html.setAttribute('data-contexto', atributo)
    imagem.setAttribute('src',`/imagens/${atributo}.png`)
    botoes.forEach((botao) => {
        botao.classList.remove('active')
    })
    switch (atributo) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        alarme.play()
        zerar()
        return
    } 
    tempoDecorridoEmSegundos -= 1
    console.log('Temporizador' + tempoDecorridoEmSegundos)
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar () {
    if (intervaloId) {
        pauseBt.play()
        zerar()
        return
    }
    playBt.play()
    intervaloId = setInterval(contagemRegressiva,1000)
}

function zerar () {
    clearInterval(intervaloId)
    intervaloId = null
}