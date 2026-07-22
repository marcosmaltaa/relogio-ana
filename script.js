const frases = [
    "Era um dia ruim, mas Jesus estava no barco.",
    "Pois sabendo que o senhor estava comigo, criei coragem e não temi.",
    "Não esqueça a vida que prometeu a si mesmo.",
    "Não peça um fardo mais leve, peça ombros mais fortes.",
    "A esperança é o que nos mantém vivos.",
    "Cada prova que você enfrenta é um degrau, não uma parede.",
    "Você já venceu 100% dos dias difíceis que já viveu até hoje.",
    "Cansar é permitido. Desistir, não.",
    "O cansaço é temporário, desistir é para sempre.",
    "Deus não te trouxe até aqui pra te deixar cair agora.",
    "Sua história não termina no capítulo difícil.",
    "Um passo de cada vez já é progresso.",
    "A vitória de hoje começou na persistência de ontem.",
    "Continue. A colheita chega para quem não abandona o campo.",
    "Você é mais forte do que essa semana difícil.",
    "Nem toda prova é sobre passar; algumas são sobre quem você se torna.",
    "Levanta, sacode a poeira e dá a volta.",
    "O que é difícil hoje, será sua força amanhã.",
    "Hey ho, Let's go!",
    "Ana China você é braba demais",
    "Te amo demais <3",
    "Não deixe os pensamentos negativos te dominarem",
    "Eu provavelmente estou trabalhando hehe",
    "Não se esqueça de tomar água",
    "Lembra de se alimentar",
    "Lembre de se alongar",
    "Busque comer cimento!",
    "Lembra que você tem escoliose",
]


async function start_clock(){
    const inputElement = document.getElementById("sec_to_start");
    const contagemDiv = document.querySelector(".contagem");
    const seconds = Number(inputElement.value);
    await count_seconds(seconds, contagemDiv);
    print_horarios(contagemDiv);

}

function atual_data(quantidade){
    const array = [];
    let currentDate = new Date();
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);
    for (let i = 0; i < quantidade; i++) {
        array.push(new Date(currentDate));
        currentDate = new Date(currentDate.getTime() + (30 * 60 * 1000));
        
    }
    array.shift()
    currentDate = array.at(-2)
    array.splice(-2)
    for (let i = 0; i < 3; i++) {
        array.push(new Date(currentDate));
        currentDate = new Date(currentDate.getTime() + (15 * 60 * 1000));
        
    }
    return array;
}

function count_seconds(seconds, div){
    return new Promise((resolve) => {
        const sound = new Audio('Sheets/Sound/Tick.mp3');
        let count = 0;
        const element = document.createElement("h1");
        element.className = "contador_segundos"
        div.append(element);
        
        const timerId = setInterval(() => {
            sound.play();
            element.textContent = count + 1;
            count++;
            if (count > seconds) {
                clearInterval(timerId);
                element.textContent = ""
                resolve();
            }
        }, 1000);
    });
}

function print_horarios(div){
    const array_horarios = atual_data(12)
    const ul = div.querySelector(".horario_quadro")
    const horarios_tratados = array_horarios.map(date => {
        return date.toTimeString().split(" ")[0].split(":").slice(0, 2).join(":")
    })
    horarios_tratados.forEach(horario => {
        const li = document.createElement("li")
        li.textContent = horario
        ul.append(li)
    })
    remove_inicio();
    verificar_horario(horarios_tratados);
}

function verificar_horario(array_horarios){
    const formatarHorario = (date) => {
        const horas = String(date.getHours()).padStart(2, "0");
        const minutos = String(date.getMinutes()).padStart(2, "0");
        return `${horas}:${minutos}`;
    };
    const checarAgora = () => {
        const horarioAtual = formatarHorario(new Date());

        if (array_horarios.includes(horarioAtual)) {
            var index = array_horarios.indexOf(horarioAtual);
            const li = document.querySelectorAll(".horario_quadro li")[index];
            li.style.textDecoration = "line-through";
        }
    };
    checarAgora(); 
    setInterval(checarAgora, 60 * 1000);
}

function resetar(){
    const contagemDiv = document.querySelector(".contagem");
    const ul = contagemDiv.querySelector(".horario_quadro");
    ul.innerHTML = "";
}

function remove_inicio(){
    const button = document.getElementById("start");
    const inputElement = document.querySelector(".selecao_segundos_start");

    if (button) {
        button.style.display = "none";
    }

    if (inputElement) {
        inputElement.style.display = "none";
    }
    const h1 = document.createElement("h1")
    h1.textContent = frases[Math.floor(Math.random() * frases.length)]
    document.querySelector(".titulo").appendChild(h1);

}