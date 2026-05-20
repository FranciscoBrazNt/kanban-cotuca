let nomes = ["Criar uma atividade"];
let descricoes = ["Esta é uma atividade demonstrativa. Use o formulário acima para criar novas tarefas."];
let prazos = [365];
let status = ["Fazer","Progresso","Feito"]

let listaDeAtividades = [];
let novoKanban =[];
const formulario = document.getElementById("CriarKanban")
let submit = document.getElementById("SubmitKanban")
let addKanban = document.getElementById("add-kanban")
let TextoBotao = ["Começar","Feito","Excluir"]

const DestinoFazer = document.getElementById("KanbansFazer");
const DestinoProgresso = document.getElementById("KanbansProgresso");
const DestinoConcluido = document.getElementById("KanbansConcluido");
let destinos = [DestinoFazer,DestinoProgresso,DestinoConcluido]



for (let i = 0; i < nomes.length; i++) {
   let atividadeInicial = {
        id: i,
        nome: nomes[i],
        descricao: descricoes[i],
        prazo: prazos[i],
        status: "Fazer", 
        prioridade: "Baixa"
    };
    listaDeAtividades.push(atividadeInicial)
    AtualizarTela(atividadeInicial)
}

function KanbanFeito(idAtividade){
    let atividade = listaDeAtividades.find(item => item.id === idAtividade);
    let kbAntigo = document.getElementById("Kb" + idAtividade) 

    if (kbAntigo){
        kbAntigo.remove();
    }
    if (atividade){
        if (atividade.status === "Fazer"){
            atividade.status = "Progresso";
            AtualizarTela(atividade)
            atualizarKanban(idAtividade,atividade.status)
            
        }
        else if (atividade.status === "Progresso"){
            atividade.status = "Feito"
            AtualizarTela(atividade)
            atualizarKanban(idAtividade,atividade.status)
        }
        else{
            kbAntigo.remove();
        }
    }
}
function atualizarKanban(id,status){
        let kb = document.getElementById("Kb" + id)
        let hd = document.getElementById("Hd" + id)
        let bt = document.getElementById("Button" + id)
    if (status == "Fazer"){
        kb.style.backgroundColor = "#bcd6f7"
        hd.style.backgroundColor = "#558ee3"
        bt.style.backgroundColor = "#558ee3"}
    else if (status == "Progresso"){
        kb.style.backgroundColor = "#f6f7bcff"
        hd.style.backgroundColor = "#f4f26dff"
        bt.style.backgroundColor = "#f4f26dff"}
    else {
        kb.style.backgroundColor = "#c3fae8";
        hd.style.backgroundColor = "#51c560ff";
        bt.style.backgroundColor = "#51c560ff";
    }

    }

function CKanban(e){
    e.preventDefault();
    let nomeForms =  document.getElementById("nomeCKanban").value;
    let descricaoForms =  document.getElementById("descCKanban").value;
    let prazoForms = Number(document.getElementById("prazoCKanban").value);
    let prioridadeForms = document.getElementById("prioridadeKanban").value;
    let statusForms = "Fazer"
    

    if (nomeForms !== "" && descricaoForms !== "" && prazoForms !== "") 
        {nomes.push(nomeForms)
        descricoes.push(descricaoForms)
        prazos.push(prazoForms)
        

        novoKanban = {
            id: listaDeAtividades.length,
            nome: nomeForms,
            descricao: descricaoForms,
            prazo: prazoForms,
            status: statusForms,
            prioridade: prioridadeForms
        }
        listaDeAtividades.push(novoKanban);
        AtualizarTela(novoKanban,novoKanban.prioridade);
        atualizarKanban(novoKanban.id,novoKanban.status)
        formulario.reset();
        };  

    
    
    
}
function AtualizarTela(atividade,cor){
    const destinoCorreto = obterDestino(atividade.status);
    const texto = ObterTexto(atividade.status);
    let CorPrioridade = ObterCor(cor)  

    destinoCorreto.innerHTML += `
        <div class="Kanbanzinho" id="Kb${atividade.id}">
            <div class="HeaderKanbanzinho" id="Hd${atividade.id}">
                <h3 class="NomeKanbanzinho"> ${atividade.nome} </h3>
            </div>
            <div class="BodyKanbanzinho">
                <h3 class="descKanbanzinho"> ${atividade.descricao} </h3>
                <h3 class="prazoKanbanzinho"> ${atividade.prazo} Dias </h3>
                <h3 class="NivelKanban">Prioridade: <span style="color: ${CorPrioridade}">${atividade.prioridade} </span> </h3>

                <button class="ButtonKanbanzinho" id="Button${atividade.id}" type="Button" onclick="KanbanFeito(${atividade.id})"> ${texto} </button>
            </div>
        </div>`;
}

function mostrarForms(){
    if (formulario.style.display == "flex")
        {formulario.style.display = "none"}
    else   
        {formulario.style.display = "flex"}
    
}
function obterDestino(status){
    if (status == "Progresso") return DestinoProgresso;
    if (status == "Feito") return DestinoConcluido;
    return DestinoFazer
}

function deleteKb(){
    
}
function ObterTexto(statusKb){
    if (statusKb == "Fazer") return TextoBotao[0];
    if (statusKb == "Progresso") return TextoBotao[1];
    return TextoBotao [2]
}

function ObterCor(prioridade){
    if (prioridade == "Baixa") return "#5893ff"
    if (prioridade == "Media") return "#ffef94"
    return "#f5604c"
}


submit.addEventListener("click", CKanban)
addKanban.addEventListener("click",mostrarForms)
