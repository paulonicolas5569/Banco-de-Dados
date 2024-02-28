const { ipcRenderer } = require('electron')

//STATUS DA CONEXÃO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//enviar uma mensagem ao processo principal // correção BUG ícone status //passo 1 slide
ipcRenderer.send('send-message', "Status do banco de dados:")

//receber mensagens do processo principal sobre o status da conexão - passo 4 slide
ipcRenderer.on('db-status', (event, status) => {
    console.log(status)
    if (status === "Banco de dados conectado") {
        document.getElementById("status").src = "../public/img/dbon.png"
    } else {
        document.getElementById("status").src = "../public/img/dboff.png"
    }
})

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//CRUD CREATE - inserir dados na Coleção
//Passo 1 - Slide (receber os dados do form)
//querySelector recebe o conteúdo relacionado ao id
let formulario, nomeTarefa, descricaoTarefa, lista //Passo 4.2
formulario = document.querySelector("#frmTarefas")
nomeTarefa = document.querySelector("#txtTarefa")
descricaoTarefa = document.querySelector("#txtDescricao")
lista = document.querySelector("#listaTarefas")//Passo 4.2

let arryTarefas = [] // Passo 4.3

//recebimento dos dados do formulário ao pressionar o botão salvar - Passo 1 do slide
formulario.addEventListener("submit", async (event) => {
    event.preventDefault() //ignorar o comportamento padrão (reiniciar o documento após envio dos dados do formulário)
    //console.log("recebendo") 
    console.log(nomeTarefa.value, descricaoTarefa.value)
    //criar uma estrutura de dados usando objeto para envio ao main (argumentos)
    const tarefa = {
        nome: nomeTarefa.value,
        descricao: descricaoTarefa.value
    }
    ipcRenderer.send('new-task', tarefa) //passo 2 do slide - envio dos dados para o main
    formulario.reset() //limpar o formulário após envio
})
//confirmar cadastro da tarefa no banco de dados
ipcRenderer.on('new-task-created', (event, args) => {

})

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//CRUD READ - Buscar os dados do banco de dados e mostrar na Tabela 
// Enviar Para o main um pedido para buscar as tarefas pendentes no banco de dados - (Passo 1 do slide)
ipcRenderer.send('get-tasks')
// Passo 3(slide) Receber as tarefes pendentes do main 
ipcRenderer.on('pending-tasks', (event, args) => {
    console.log(args)//Passo3 - fins didaticos teste de recebimento das tarefas pedentes 
    // passo 4:  renderizar as tarefas pedentes no documento index.HTML
    /*
        4.1 criar uma lista ou tabela no html
        4.2 Capturar o id da lista ou tabela 
        4.3 Criar um vetor para estruturar os dados 
        4.4 Criar um Função para renderizar a lista ou tabela 
    */
    // criar Uma constante Para Receber as Tarefas Pendentes 
    const tarefasPendentes = JSON.parse(args)
    // Atribuir ao vetor
    arryTarefas = tarefasPendentes
    console.log(arryTarefas) // fins didáticos - exibir a estrutura de dados 
    //executar a função renderizarTarefas() Passando com parãmetro o array
    renderizarTarefas(arryTarefas)
})

// Passo 4:  Função usada para renderizar (exibir) os dados em uma lista ou tabela usada a linguagem html
function renderizarTarefas(tasks) {
    lista.innerHTML = "" // Limpar a lista
    // percorrer o array
    tasks.forEach((t) => {
        lista.innerHTML += `
        <li>
            <h5>Id:${t._id}</h5>
            <p>Tarefa:${t.nome}</p> 
            <p>Descrição:${t.descricao}</p> 

        </li>
        <br>
        `
    })
}
