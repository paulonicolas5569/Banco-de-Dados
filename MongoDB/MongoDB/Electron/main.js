/**
 * Arquivo principal de configuração do electron
 */

//processos (back-end)
console.log("Hello Electron! (Processo principal node.js(back-end))")

// importar o electron
const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron')
// definir o path (preload.js)
const path = require('node:path')


// janela principal
const mainWindow = () => {
    // criar um objeto de nome win (configurações da janela)
    const win = new BrowserWindow({
        width: 800, //largura da janela
        height: 600, //altura da janela
        resizable: false, //evitar redimensionamento
        title: "Tutorial Electron", //mudar titulo
        //autoHideMenuBar: true, //esconder ou substituir menu
        icon: `${__dirname}/src/public/img/pc.png`, //inserir um icone ${__dirname} -> caminho absoluto
        webPreferences:{
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,//Permite executar recursos do node em app.js
            contextIsolation: false
        }
    })
    //carregar um documento html na janela principal
    win.loadFile(`${__dirname}/src/views/index.html`)

    //carregar menu personalizado
    const menuPersonalizado = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menuPersonalizado)
} //fim da janela principal

// janela sobre
let about //variavel de apoio para resolver o problema de abrir múltiplas instancias da janela sobre
const aboutWindow = () => {
    //se não existir nenhuma janela criada - criar uma nova e se existir não crie (!inverter a lógica)
    if (!about) {
        // criar um objeto de nome win (configurações da janela)
        about = new BrowserWindow({
            width: 360, //largura da janela
            height: 320, //altura da janela
            resizable: false, //evitar redimensionamento
            title: "Sobre", //mudar titulo
            autoHideMenuBar: true, //esconder ou substituir menu
            icon: `${__dirname}/src/public/img/pc.png` //inserir um icone ${__dirname} -> caminho absoluto
        })
        //carregar um documento html na janela principal
        about.loadFile(`${__dirname}/src/views/sobre.html`)
        //o codígo abaixo resolve o problema de reabertura da tela sobre
        about.on('closed', () => {
            about = null
        })
    }
}


//exibir a janela principal
app.whenReady().then(() => {
    mainWindow()
    // MAC OS - Ativar aplicativos se nenhuma janela estiver aberta 
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

//Encerrar Aplicativo Ao fechar janlas (Windows w Linux)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
    })

//Menu personalizado
const menuTemplate = [
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'Sair',
                click: () => app.quit(),
                accelerator: 'Alt+F4'
            }
        ]
    },
    {
        label: 'Exibir',
        submenu: [
            {
                label: 'Recarregar',
                role: 'reload',
                accelerator: 'F5'
            },
            {
                label: 'Ferramentas do desenvolvedor',
                role: 'toggleDevTools',
                accelerator: 'Ctrl+Shift+i'
            },
            {
                type: 'separator'
            },
            {
                label: 'Aplicar zoom',
                role: 'zoomIn'
            },
            {
                label: 'Reduzir',
                role: 'zoomOut'
            },
            {
                label: 'Restaurar o zoom padrão',
                role: 'resetZoom'
            }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'Documentos',
                click: () => shell.openExternal("https://www.electronjs.org/pt/docs/latest/")
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

//Exemplo de comunicação entre processos (front-ent e back-end)
ipcMain.on('send-message', (event, message) => {
    console.log("Processo Principal recebeu a mensagem:", message)
    // eEncviar uma resposta para o processo de renderização 
    event.sender.send('receive-message',"Olá Renderizador!!")
})