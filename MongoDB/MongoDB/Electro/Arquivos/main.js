// importar o electron
const {
    app,
    BrowserWindow,
    Menu
} = require('electron')

//janela principal
//uma função que ira executar e gerar nossa janela principal
const mainWindow = () => {
    //criar um objeto de nome win (configurações da janela)
    const win = new BrowserWindow({
        width: 800, //largura da janela
        height: 1080, // altura da janela
        resizable: false, //desabilita o redimensionamento da tela
        title: "Tutorial Electron", //muda o titulo da janela
        autoHideMenuBar: false, //esconde a barra de menu na parte superior
        icon: `${__dirname}/src/public/img/fogo.png`, //inserir um ícone ${__dirname} => caminho absoluto

    })

    //carregar documento html na janela principal
    win.loadFile(`${__dirname}/src/views/index.html`)
    const menuPersonalizado = Menu.buildFromTemplate(menuTemplate) //Carregar o menu personalizados (Linha 46)
    Menu.setApplicationMenu(menuPersonalizado)
}

let about //variavel para resolver o problema de abrir multiplas janelas


//criar a janela sobre - conteudo duplicado da janela principal
const aboutWindow = () => {
    //se não existir nenhuma janela criada, cria uma nova e se existir ele não cria (! inverte a logica)
    if (!about) {
        //criar um objeto de nome win (configurações da janela)
        about = new BrowserWindow({
            width: 360, //largura da janela
            height: 320, // altura da janela
            resizable: false, //desabilita o redimensionamento da tela
            title: "Sobre", //muda o titulo da janela
            autoHideMenuBar: true, //esconde a barra de menu na parte superior
            icon: `${__dirname}/src/public/img/fogo.png` //inserir um ícone ${__dirname} => caminho absoluto
        })

        //carregar documento html na janela principal
        about.loadFile(`${__dirname}/src/views/sobre.html`)
        //reseta a variavel about para resolver o problema de reabertura da tela Sobre
        about.on('closed', ()=>{ //assim que fechar a aba ele vai executar a função 
            about = null
        })
        }


}
//exibir a janela principal
//quando o app estiver pronto ele devera executar a arrow function mainWindow()
app.whenReady().then(() => {
    mainWindow()
})

//menu presonalizado
//criando um vetor
const menuTemplate = [
    //objeto do vetor
    {
        //coloca o Arquivo na barra de menu
        label: 'Arquivo',
        submenu: [ //menu que ira aparece quando criar o Arquivo
            {
                label: 'sair',
                click: () => app.quit(), //script para que a aba seja fechada quando clicada na label
                accelerator: 'Alt+F4' //mostra a tecla de atalho para executar o comando
            }
        ]
    },
    {
        label: 'Exibir',
        submenu: [{
            label: 'Recarregar', //adiciona um submenu para recarregar e quando clicado ele recarrega
            role: 'reload' //atribui a acclerator automaticamente como uma regra, e ja atribuindo sua função
            },
        {
            label: 'Ferramentas do desenvolvedor',
            role: "toggleDevTools" 
        
        },
        {
            type: 'separator' //desenha uma linha
        },
        {
            label: 'Aplicar zoom',
            role: 'zoomIn'
        },
        {
            label: 'Retirar zoom',
            role: 'zoomOut'
        },
        {
            label: 'Restaurar zoom',
            role: 'resetZoom'
        }]
    },
    {
        label: 'Ajuda',
        submenu: [{
            label: 'Sobre',
            click: aboutWindow //assim que clicado, chama a janela aboutWindow
        }]
    }
]
