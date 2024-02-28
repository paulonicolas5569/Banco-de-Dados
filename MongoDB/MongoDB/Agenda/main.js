/**
 * Arquivo principal de configuração do Electron
 */

//Processos (Back-end)
console.log("Hello Electron! Processo Principal do Node.JS (Back-End)")

//Importar o Electron
const { app, BrowserWindow, Menu, shell, ipcMain, dialog } = require('electron')

//Definir o Path(preload.js)
const path = require('node:path')

//Importar o Módulo do Banco de Dados
const {conectar, desconectar} = require('./db')
const { error } = require('node:console')

//Importar o Schema (Models)
const Tarefa = require(`${__dirname}/src/models/Tarefa`)

let win //Reutilização desta Variável no status

//Janela Principal
const createWindow = () => {
    //Cria um objeto de nome win (Configurações da janela)
     win = new BrowserWindow({
        width: 800, //Largura da Janela
        height: 600, //Altura da Janela
        resizable: false, //Evita redimensionamento (Não deixa a Janela aumentar)
        title: "Tutorial Electron", //Coloca um Título
        //autoHideMenuBar: true ,      //Esconde ou Substitui o Menu que vem automático
        icon: `${__dirname}/src/public/img/pc.png`,  //Coloca um Ícone ${__dirname} --> Caminho Absoluto
        webPreferences: {
            nodeIntegration: true,//
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true, //Faz com que execute recursos do Node tanto no back, tanto no front
            contextIsolation: false
        }
    })

    //Carregar um documento HTML na Janela Principal (Depois de criar a Janela Principal)
    win.loadFile(`${__dirname}/src/views/index.html`)

    //Carregar o Menu  Personalizado
    const menuPersonalizado = Menu.buildFromTemplate(menuTemplate)//Esta linha vai ser onde vou Personalizar
    Menu.setApplicationMenu(menuPersonalizado)


}
//Fim da Janela Principal

let about //Variável de apoio para resolver o problema de abrir múltiplas instÂ

//Cria a Janela "Sobre"
const aboutWindow = () => {
    //Se não existir nenhuma Janela - Criar Janela
    //Se existir, não crie
    if (!about) {
        //Cria um objeto de nome win (Configurações da janela)
        about = new BrowserWindow({
            width: 360, //Largura da Janela
            height: 320, //Altura da Janela
            resizable: false, //Evita redimensionamento (Não deixa a Janela aumentar)
            title: "Sobre", //Coloca um Título
            autoHideMenuBar: true,       //Esconde ou Substitui o Menu que vem automático
            icon: `${__dirname}/src/public/img/pc.png`  //Coloca um Ícone ${__dirname} --> Caminho Absoluto
        })

        //Carregar um documento HTML na Janela Principal (Depois de criar a Janela Principal)
        about.loadFile(`${__dirname}/src/views/sobre.html`)

        //O código abaixo resolve o problema de reabertura da tela "Sobre"
        about.on('closed', () => {
            about = null
        })
    }
}

//Mostrar a Janela Principal
app.whenReady().then(() => {
    createWindow()    //Mostra a Janela Principal
    //statusConexao() //Executa a função para verificar o status de conexão
    //aboutWindow()

    //MacOS - Ativar aplicativo SE nenhuma Janela estiver aberta
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

//Encerrar aplicativo ao fechar Janelas (Windows e Linux)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})


//Menu personalizado
const menuTemplate = [
    //Primeiro Menu
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'Sair',
                click: () => app.quit(),//Sair da Janela/Programa
                accelerator: 'Alt+F4' //Teclas de Atalho
            }
        ]
    },

    //Outro Menu
    {
        label: 'Exibir',
        submenu: [
            {
                label: 'Recarregar',
                role: 'Reload'      //Recarrega a Janela
            },
            {
                label: 'Ferramentas do Desenvolvedor',
                role: 'toggleDevTools'
            },
            {
                type: 'separator'
            },
            {
                label: 'Aplicar Zoom',
                role: 'zoomIn'
            },
            {
                label: 'Reduzir Zoom',
                role: 'zoomOut'
            },
            {
                label: 'Restaurar o Zoom padrão',
                role: 'resetZoom'
            }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'Documentos',
                click: () => shell.openExternal("https://www.electronjs.org/pt/docs/latest/") //Linha para abrir um Link Externo
            },
            {
                type: 'separator'
            },
            {
                label: 'Sobre',
                click: aboutWindow
            }
        ]
    }
]

//Exemplo de Comunicação entre Processos (Front-end(Renderização) & Back-end)
ipcMain.on('send-message', (event, message) => {
    console.log("Processo Principal recebeu uma mensagem: ", message)

    //Enviar uma Resposta para o processo de Renderização
    event.sender.send('receive-message', "Olá! Renderizador!")


}) //Ligue para receber mensagem desse nome

//Encerrar a conexão com o Banco de Dados quando o aplicativo for fechado
app.on('before-quit', async () => {
    await desconectar()
})

//Renderer manda comunicação entre processos. Correção do BUG "Reload" do Ícone de Status - Passo 2 Slide
ipcMain.on('send-message', (event, message)=>{
    console.log("<<<", message)
    statusConexao()
})


//Status de Conexão >>>>>>>>>>>
const statusConexao = async () => {
    try {
        await conectar()
        //Enviar uma mensagem para a janela (renderer.js) informando  status da conexão e os erros caso ocorram - Passo 3 Slide
        win.webContents.send('db-status', "Banco de Dados conectado")
    } catch (error) {
        win.webContents.send('db-status', `Erro de conexão: ${error.message}`)
    }    
}

//CRUD Create >>>>>>>>>>>>
//Receber os Dados = on
ipcMain.on('new-task', async (event, args) =>{
    console.log(args) //Teste de Recebimento de Dados (pelo console)

    //Passo 3 --> Salvar no Banco de Dados os Dados do Formulário
    const novaTarefa = new Tarefa(args)
    await novaTarefa.save()

    //Usar o modal(dialog) do Sistema Operacional para enviar uma mensagem ao usuário confirmando que a tarefa foi salva
    dialog.showMessageBox(win, {
        type: 'info',
        message: 'Tarefa salva com sucesso',
        buttons: ['OK']
    })


    //Passo 4 --> Enviar uma confirmação para o renderer(front-end)
    //Passando a nova Tarefa no formato JSON (Passo extra CRUD READ)
    event.reply('new-task-created', JSON.stringify(novaTarefa))

})

//CRUD Read >>>>>>>>>>>>>
//Passo 2 (Slide) Fazer uma busca no Banco de Dados de todas as tarefas pendentes
ipcMain.on('get-tasks', async(event, args) =>{
    const tarefasPendentes = await Tarefa.find()  //.find() equivale ao SELECT do MySQL. Faz busca
    console.log(tarefasPendentes)  //Passo 2 fins didaticos. Teste de recebimento

    //Passo 3 (Slide) Enviar ao Renderer (View) as Tarefas Pendentes
    event.reply('pending-tasks', JSON.stringify(tarefasPendentes))
})