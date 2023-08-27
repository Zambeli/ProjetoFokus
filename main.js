const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const imagem = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const inputMusic = document.querySelector('#alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const imagemBotao = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')

const alarme = new Audio('./sons/beep.mp3')
const pauseBt = new Audio('./sons/pause.mp3')
const playBt = new Audio('./sons/play.wav')
const music = new Audio('./sons/luna-rise-part-one.mp3')
music.loop = true

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

inputMusic.addEventListener('change', () => {
    if (music.paused) {
        music.play()
    } else {
        music.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    AlterarAtributos('foco')
    focoBt.classList.add('active')
    imagem.setAttribute('src',`./imagens/animeestudando.png`)
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    AlterarAtributos('descanso-curto')
    curtoBt.classList.add('active')
    imagem.setAttribute('src',`./imagens/animecurto.png`)
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    AlterarAtributos('descanso-longo')
    longoBt.classList.add('active')
    imagem.setAttribute('src',`./imagens/animedescansando.webp`)
})

function AlterarAtributos (atributo) {
    mostrarTempo()
    html.setAttribute('data-contexto', atributo)
    botoes.forEach((botao) => {
        botao.classList.remove('active')
    })
    switch (atributo) {
        case 'foco':
            titulo.innerHTML = `Deixe de amolar<br>
            <strong class="app__title-strong">e vai estudar!</strong>`
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Nos veremos em Breve!</strong>`
            break
        case 'descanso-longo':
            titulo.innerHTML = `Você Merece um descanso<br>
            <strong class="app__title-strong">até Logo!</strong>`
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        alarme.play()
        alert('Tempo Finalizado')
        zerar()
        return
    } 
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar () {
    if (intervaloId) {
        pauseBt.play()
        imagemBotao.setAttribute('src','./imagens/pause.png')
        zerar()
        return
    }
    playBt.play()
    imagemBotao.setAttribute('src','./imagens/play_arrow.png')
    intervaloId = setInterval(contagemRegressiva,1000)
    iniciarOuPausarBt.textContent = 'Pausar'
}

function zerar () {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = 'Começar'
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()