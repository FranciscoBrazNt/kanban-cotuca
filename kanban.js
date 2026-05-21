const formulario = document.getElementById("CriarKanban")
const enviar = document.getElementById("SubmitKanban")

let nomes = [];
let descricoes = [""];
let prazos = [];
let situacao = [];
let prioridade = [];
let listaDeAtividades = [];
const DestinoFazer = document.getElementById("KanbansFazer");
const DestinoProgresso = document.getElementById("KanbansProgresso");
const DestinoConcluido = document.getElementById("KanbansConcluido");




for (let i = 0; i < nomes.length; i++) {
    let novoCard = {
        nome: nomes[i],
        descricao: descricoes[i],
        prazo: prazos[i],
        status: situacao[i],
        prioridade: prioridade[i],
    }
    listaDeAtividades.push(novoCard)
}

function MudarStatusProgressivo(idCard) {
    let Card = listaDeAtividades.find(item => item.id === idCard)

    if (Card.status === "Fazer") { Card.status = "Progresso" }
    else if (Card.status === "Progresso") { Card.status = "Feito" }
    else { Card.status = "Fazer" }
    DesenharCards();
}

function MudarStatusRetrogrado(idCard) {
    let Card = listaDeAtividades.find(item => item.id === idCard)
    if (Card.status === "Progresso") { Card.status = "Fazer" }
    else { Card.status = "Progresso" }
    DesenharCards();
}


function DesenharCards() {

    let CardFazer = listaDeAtividades.filter(item => item.status === "Fazer")
    let CardProgresso = listaDeAtividades.filter(item => item.status === "Progresso")
    let CardFeito = listaDeAtividades.filter(item => item.status === "Feito")


    DestinoFazer.innerHTML = "";
    DestinoProgresso.innerHTML = "";
    DestinoConcluido.innerHTML = "";


    for (let i = 0; i < CardFazer.length; i++) {
        DestinoFazer.innerHTML += `
            <div class="Kanbanzinho" id="KbF${i}">
                <div class="HeaderKanbanzinho" id="HdF${i}">
                    <h3 class="NomeKanbanzinho"> ${CardFazer[i].nome} </h3>
                </div>
                <div class="BodyKanbanzinho">
                    <h3 class="descKanbanzinho"> ${CardFazer[i].descricao} </h3>
                    <h3 class="prazoKanbanzinho"> ${CardFazer[i].prazo} Dias </h3>
                    <button class="ButtonKanbanzinho" id="ButtonP${CardFazer[i]}" type="button" onclick="MudarStatusProgressivo(${CardFazer[i].id})">Começar Atividade</button>
                </div>
            </div>`;
    }

    for (let i = 0; i < CardProgresso.length; i++) {
        DestinoProgresso.innerHTML += `
            <div class="KanbanzinhoP" id="KbP${i}">
                <div class="HeaderKanbanzinhoP" id="HdP${i}">
                    <h3 class="NomeKanbanzinho"> ${CardProgresso[i].nome} </h3>
                </div>
                <div class="BodyKanbanzinhoP">
                    <h3 class="descKanbanzinho"> ${CardProgresso[i].descricao} </h3>
                    <h3 class="prazoKanbanzinho"> ${CardProgresso[i].prazo} Dias </h3>
                    <div class="ContainerBotoes">
                        <button 
                            class="ButtonKanbanzinhoP"
                            onclick="MudarStatusRetrogrado(${CardProgresso[i].id})">
                            Marcar como Fazer
                        </button>

                        <button 
                            class="ButtonKanbanzinhoP"
                            onclick="MudarStatusProgressivo(${CardProgresso[i].id})">
                            Marcar como Feito
                        </button>
                    </div> 
                </div>
            </div>`;
    }
    for (let i = 0; i < CardFeito.length; i++) {
        DestinoConcluido.innerHTML += `
            <div class="KanbanzinhoC" id="KbC${i}">
                <div class="HeaderKanbanzinhoC" id="HdC${i}">
                    <h3 class="NomeKanbanzinho"> ${CardFeito[i].nome} </h3>
                </div>
                <div class="BodyKanbanzinhoC">
                    <h3 class="descKanbanzinho"> ${CardFeito[i].descricao} </h3>
                    <h3 class="prazoKanbanzinho"> ${CardFeito[i].prazo} Dias </h3>

                    <div class="ContainerBotoes">
                        <button 
                            class="ButtonKanbanzinhoC"
                            onclick="MudarStatusRetrogrado(${CardFeito[i].id})">
                            Marcar como em Progresso
                        </button>
                        <button 
                            class="ButtonKanbanzinhoC"
                            onclick="ExcluirCard(${CardFeito[i].id})">
                            Excluir Atividade
                        </button>
                    </div>
                </div>
            </div>`;
    }
}

function adicionarCard(e) {
    e.preventDefault();

    let nomeForms = document.getElementById("nomeCKanban").value;
    let descForms = document.getElementById("descCKanban").value;
    let prazoForms = Number(document.getElementById("prazoCKanban").value);
    let statusForms = document.getElementById("statusKanban").value;
    let prioridadeForms = document.getElementById("prioridadeKanban").value;
    if (nomeForms != "" && descForms != "" &&  prazoForms != 0 ){
        let novoCard = {
            id: Date.now(),
            nome: nomeForms,
            descricao: descForms,
            prazo: prazoForms,
            status: statusForms,
            prioridade: prioridadeForms,
        }
        listaDeAtividades.push(novoCard);
        formulario.reset();
        DesenharCards();
    }
    

}





function mostrarForms() {
    if (formulario.style.display == "flex") { formulario.style.display = "none" }
    else { formulario.style.display = "flex" }
}

function ExcluirCard(cardId){
    listaDeAtividades = listaDeAtividades.filter(item => item.id !== cardId)
    DesenharCards();
}

let addKanban = document.getElementById("add-kanban")
addKanban.addEventListener("click", mostrarForms)
enviar.addEventListener("click", adicionarCard)

