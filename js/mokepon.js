const sectionSeleccionarAtaque = document.getElementById('Ataque')
const sectionReiniciar = document.getElementById('reinicio')
const BotonMascotaJugador = document.getElementById("btnSeleccionarMascota")
const BotonFuego = document.getElementById("btn-fuego")
const BotonAgua = document.getElementById("btn-agua")
const BotonTierra = document.getElementById("btn-tierra")
const BotonReinciar = document.getElementById("btnreinicio")


const sectionselemasc = document.getElementById('selemasc')
const inPucas = document.getElementById("puca")
const inCharlie = document.getElementById("charlie")
const inElena = document.getElementById("elena")

const MascotaUser = document.getElementById("NombreMascota")

const mascotaEnemigo = document.getElementById("NombreMascotaEnemigo")

const spanVidaMascotaUser = document.getElementById("VidaMiMascota")
const spanVidaMascotaEnemigo = document.getElementById("VidaMascotaEnemigo")

const sctMensajes = document.getElementById("resultado")
const ataquedeljugador = document.getElementById("ataquejugador")
const ataquedelenemigo = document.getElementById("ataqueenemigo")

const nuevoatkju = document.createElement("p")
const nuevoatkene = document.createElement("p")

const contenedorTarjetas = document.getElementById('contenedorTarjetas')


let mokepones = []

let opciondemokepones 

let ataqueJugador
let ataqueEnemigos
let vidasJugador = 3
let vidasEnemigo = 3

window.addEventListener("load", iniciarjuego)

class Mokepon {

    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let charlie = new Mokepon("Charlie", "./assets/mokepons_mokepon_hipodoge_attack.png", 5)
let puca = new Mokepon("Puca", "./assets/mokepons_mokepon_capipepo_attack.png", 5)
let elena = new Mokepon("Elena", "./assets/mokepons_mokepon_ratigueya_attack.png", 5)

mokepones.push(charlie,puca,elena)

charlie.ataques.push(
    { nombre : '💧', id : 'BotonAgua'},
    { nombre : '💧', id : 'BotonAgua'},
    { nombre : '💧', id : 'BotonAgua'},
    { nombre : '🔥', id : 'BotonFuego'},
    { nombre : '🌵', id : 'BotonTierra'},
)


puca.ataques.push(
    { nombre : '🌵', id : 'BotonTierra'},
    { nombre : '🌵', id : 'BotonTierra'},
    { nombre : '💧', id : 'BotonAgua'},
    { nombre : '🔥', id : 'BotonFuego'},
    { nombre : '🌵', id : 'BotonTierra'},
)

elena.ataques.push(
    { nombre : '🔥', id : 'BotonFuego'},
    { nombre : '🔥', id : 'BotonFuego'},
    { nombre : '💧', id : 'BotonAgua'},
    { nombre : '🔥', id : 'BotonFuego'},
    { nombre : '🌵', id : 'BotonTierra'},
)

function iniciarjuego() {

    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opciondemokepones = `
        <input id=${mokepon.nombre} type="radio" name="mascota" />
        <label class="Tarjetamokepon" for="${mokepon.nombre}">
            <p> ${mokepon.nombre} </p>
            <img src="${mokepon.foto}" alt="${mokepon.nombre}">
        </label>
        `
        contenedorTarjetas.innerHTML += opciondemokepones
    })

    BotonMascotaJugador.addEventListener("click", SeleccionaMascota)

    BotonFuego.addEventListener("click", AtaqueFuego)

    BotonAgua.addEventListener("click", AtaqueAgua)

    BotonTierra.addEventListener("click", AtaqueTierra)

    BotonReinciar.addEventListener("click", reiniciar)
}


function SeleccionaMascota() {

    sectionselemasc.style.display = 'none'

    sectionSeleccionarAtaque.style.display = 'flex'



    if (inPucas.checked) {
        MascotaUser.innerHTML = "Puca"

    } else if (inCharlie.checked) {
        MascotaUser.innerHTML = "Charlie"

    } else if (inElena.checked) {
        MascotaUser.innerHTML = "Elena"

    } else {
        alert('Selecciona una mascota')
    }

    seleccionarMascotaEnemigo()


}


function seleccionarMascotaEnemigo() {

    let aleatorioN = aleatorio(1, 3)

    if (aleatorioN == 1) {
        mascotaEnemigo.innerHTML = "Puca"
    } else if (aleatorioN == 2) {
        mascotaEnemigo.innerHTML = "Elena"
    } else {
        mascotaEnemigo.innerHTML = "Charlie"

    }



}

function AtaqueAgua() {

    ataqueJugador = "Agua"

    ataqueEnemigo()
}


function AtaqueFuego() {

    ataqueJugador = "Fuego"
    ataqueEnemigo()
}


function AtaqueTierra() {
    ataqueJugador = "Tierra"
    ataqueEnemigo()
}

function ataqueEnemigo() {

    let aleatorioN = aleatorio(1, 3)


    if (aleatorioN == 1) {
        ataqueEnemigos = "Agua"
    } else if (aleatorioN == 2) {
        ataqueEnemigos = "Fuego"
    } else {
        ataqueEnemigos = "Tierra"

    }
    combate()
}

function combate() {


    if (ataqueJugador == ataqueEnemigos) {
        Mensajes("Empate")
    } else if ((ataqueJugador == "Agua" && ataqueEnemigos == "Fuego") || (ataqueJugador == "Fuego" && ataqueEnemigos == "Tierra") || (ataqueJugador == "Tierra" && ataqueEnemigos == "Agua")) {
        Mensajes("Ganaste!")
        vidasEnemigo--
        spanVidaMascotaEnemigo.innerHTML = vidasEnemigo
    } else {
        Mensajes("Perdiste! ")
        vidasJugador--
        spanVidaMascotaUser.innerHTML = vidasJugador

    }
    contavida()

}


function contavida() {

    if (vidasJugador == 0) {
        Mensajesfinal("Perdiste Po")

    } else if (vidasEnemigo == 0) {

        Mensajesfinal("Ganaste perroo")

    }

}


function Mensajes(resultado) {


    sctMensajes.innerHTML = resultado
    nuevoatkju.innerHTML = ataqueJugador
    nuevoatkene.innerHTML = ataqueEnemigos

    ataquedeljugador.appendChild(nuevoatkju)
    ataquedelenemigo.appendChild(nuevoatkene)

}

function Mensajesfinal(resultadofinal) {

    sctMensajes.innerHTML = resultadofinal

    BotonFuego.disabled = true
    BotonAgua.disabled = true
    BotonTierra.disabled = true
    sectionReiniciar.style.display = 'flex'


}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function reiniciar() {

    location.reload()

}