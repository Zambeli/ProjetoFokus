const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const imagem = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')


focoBt.addEventListener('click', () => {
    AlterarAtributos('foco')
})

curtoBt.addEventListener('click', () => {
    AlterarAtributos('descanso-curto')
})

longoBt.addEventListener('click', () => {
    AlterarAtributos('descanso-longo')
})

function AlterarAtributos (atributo) {
    html.setAttribute('data-contexto', atributo)
    imagem.setAttribute('src',`/imagens/${atributo}.png`)
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