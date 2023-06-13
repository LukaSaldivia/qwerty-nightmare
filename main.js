const OUTPUT = 1000;
const TIME = 30 * OUTPUT;

let divFrase = document.querySelector('#fraseOriginal');
let keyDetector = document.querySelector('#keyDetector');


const frase = "El veloz murciélago hindú comía feliz kiwi. La cachorra tocaba el saxofón con queso entre los dientes. La jauría vistante lo notó."

let fraseArr = frase.split('');
let largoFrase = frase.length;

let index = 0;
let continua = true;
let errores = 0;


let reloj = new Krono({
    output : OUTPUT,
    isBackwards : true,
    initial : TIME,
    end : true
})



fraseArr.forEach(e => {
    document.querySelector('#fraseOriginal').innerHTML += `<div>${e}</div>`;
});

function inputChange(el) {
    console.log(el.value);
}



keyDetector.addEventListener('input',(e) =>{
    
    if(continua){
        if(index < largoFrase){
            reloj.start();

        let userInput = e.target.value;
        keyDetector.value = '';

        let originalLetter = fraseArr[index];

        divFrase.children[index].classList.add('green')
        divFrase.childNodes.forEach(e=>{e.classList.remove('active')})


        if(divFrase.children[index+1]){
            divFrase.children[index+1].classList.add('active')
        }

        if(userInput == ' '){
            divFrase.children[index].classList.add(`espacio`)
        }
        
        if(originalLetter != userInput){
            errores++;
            divFrase.children[index].classList.remove('green')
            divFrase.children[index].classList.add(`red`)
        }

        document.querySelector('#accuracy').innerHTML = `${Math.floor(((index+1-errores)/largoFrase)*100)}%`
        document.querySelector('#key').innerHTML = userInput

        updateSpan(index,userInput)
        index++;
    }

    if(index == largoFrase){
        let tiempo = Math.round(reloj.getTime()/OUTPUT);
        reloj.pause()

        // alert(tiempo)
    }
}else{
    // alert('Tiempo terminado')
}
})



function isSame(og,user) {
    return og == user;
}

function updateSpan(i,letter) {
    divFrase.children[i].innerHTML = letter;
}

function loop() {
    window.requestAnimationFrame(loop);
    if(reloj.getTime() == 0){
        continua = false;
    }

    document.querySelector('#bar').style.scale = `${reloj.getTime()/TIME} 1`
}

loop();