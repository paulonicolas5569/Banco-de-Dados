const {ipcRenderer} = require('electron')

//Status da Conexão >>>>>


//Enviar uma mensagem ao processo principal - Correção do BUG do Ícone Status - Passo 1 Slide
ipcRenderer.send('send-message', "Status do Banco de Dados:")

//Receber mensagens do processo sobre o status da conexão - Passo 4 Slide
ipcRenderer.on('db-status', (event, status) => {
    console.log(status)
    if (status === "Banco de Dados conectado"){
        document.getElementById("status").src = "../public/img/dbon.png"
    } else {
        document.getElementById("status").src = "../public/img/dboff.png"
    }
})

//>>>>>>>>>>>> Fim do Status

//CRUD CREATE - Inserir Dados na Tabela

//Passo 1 Slide --> Receber os dados do form
//*Obs: querySelector recebe o conteúdo relacionado ao id
let formulario, nomeTarefa, descricaoTarefa, lista
formulario = document.querySelector("#frmTarefas")
nomeTarefa = document.querySelector("#txtTarefa")
descricaoTarefa = document.querySelector("#txtDescricao")

lista = document.querySelector("#agendaTarefas") //Esta linha vai preencher os dados na coluna da página Passo 4.2

let arrayTarefas = []   //Passo 4.3



//Método que vai receber os dados do Formulário ao pressionar o Botão "Salvar"
formulario.addEventListener("submit", async (event) =>{
    event.preventDefault() //Ignorar o comportamento padrão (reiniciar o Documento APÓS o envio dos dados do Formulário)
    //console.log("Recebendo")
    //console.log(nomeTarefa.value, descricaoTarefa.value)//Teste para ver se estou recebendo os Dados

    
    //Criar uma estrutura de dados usando objeto para Envio ao main.js (Argumentos)
    const tarefa = {
        nome: nomeTarefa.value,
        fone: descricaoTarefa.value
    }

    //Passo 2 do Slide --> Envio dos Dados para o Main
    //send = envia,  on = recebe
    ipcRenderer.send('new-task', tarefa)

    formulario.reset()  //Limpar o Formulario APOS O ENVIO
})

//Confirmar cadastro (da Tarefa) do Banco de Dados SE der certo
ipcRenderer.on('new-task-created', (event, args) =>{
    //CRUD READ - Passo extra: atualizar a lista automaticamente quando uma nova tarefa for adicionada ao banco
    const novaTarefa = JSON.parse(args)
    arrayTarefas.push(novaTarefa)
    renderizarTarefas(arrayTarefas)
})





//>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//!!!!CRUD READ - Buscar os Dados do Banco
//Enviar para o Main um pedido para buscar as Tarefas pendentes no Banco de Dados (Passo 1 Slide)
ipcRenderer.send('get-tasks')

//Passo 3 (Slide) Receber as Tarefas pendentes do main
ipcRenderer.on('pending-tasks', (event, args) =>{
    console.log(args) //Passo 3 - Fins didáticos teste de recebimento das Tarefas pendentes

    //Passo 4 - Renderizar as tarefas pendentes no Documento index.html
    /**
     * 4.1 Criar uma lista ou tabela no html
     * 4.2 Capturar o id a lista ou tabela
     * 4.3 Criar um Vetor para estruturar os dados
     * 4.4 Criar uma Função para renderizar a Lista ou Tabela
     */

    //Continuaçao do Passo4... Criar uma constante para receber as Tarefas pendentes
    //JSON.parse (Garantir o formato JSON)
    const tarefasPendentes = JSON.parse(args)

    //Atribuir ao Vetor
    arrayTarefas = tarefasPendentes
    console.log(arrayTarefas) //Fins didáticos - exibir a estrutura de Dados no Console

    //Executar a Função renderizarTarefas() passando o array como parâmetro
    renderizarTarefas(arrayTarefas)
})

//Passo 4: Função usada para Renderizar (exibir) os dados em uma lista ou tabela usando a linguagem html
function renderizarTarefas(tasks){
    lista.innerHTML = "" //Limpar a Lista antes de renderizar
    
    //Percorrer o Array - Vai mostrar os Valores no HTML usando a letra "t" Ex: t._id, t.nome
    tasks.forEach((t) => {
        lista.innerHTML += `
        <table border="1">
        <th>Id</th>
        <th>Nome</th>
        <th>Telefone</th>

        <tr>
        <td> ${t._id}</td>
        <td> ${t.nome}</td>
        <td> ${t.fone}</td>

        </tr>
        </table>
        <br>
        `
    });
}