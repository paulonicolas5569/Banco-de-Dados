const { app, BrowserWindow, ipcMain, dialog } = require('electron/main')
const path = require('node:path')

// importar o módulo do banco de dados
const { conectar, desconectar } = require('./db.js')

// importar o Schema (models)
const Tarefa = require(`${__dirname}/src/models/Tarefa`)

let win //reutilização desta variável no status conexão
const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile(`${__dirname}/src/views/index.html`)
}

app.whenReady().then(() => {
  createWindow() //criar a janela  

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// encerrar a conexão com o banco de dados antes do aplicativo ser fechado
app.on('before-quit', async () => {
  await desconectar()
})

// acrescentar este processo (correção de bug reload ícone status) - passo 2 slide
ipcMain.on('send-message', (event, message) => {
  console.log("<<<", message)
  statusConexao()
})

//status de conexão >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const statusConexao = async () => {
  try {
    await conectar()
    // Enviar uma mensagem para a janela (renderer.js) informando o status da conexão e os erros caso ocorram - passo 3 -slide
    win.webContents.send('db-status', "Banco de dados conectado")
  } catch (error) {
    win.webContents.send('db-status', `Erro de conexão: ${error.message}`)
  }
}

//CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('new-task', async (event, args) => {
  console.log(args) // teste de recebimento
  //salvar no banco de dados os dados do formulário - Passo 3 slides
  const novaTarefa = new Tarefa(args)
  await novaTarefa.save()
  // usar o modal (dialog) do sistema operacional para enviar uma mensagem ao usuario confirmando que a tarefa foi salva 
  dialog.showMessageBox(win,{
    type: 'info',
    message: 'Tarefa salva com sucesso',
    buttons: ['OK']
  })

  //enviar uma confirmação para o renderer(front-end) - passo 4
  event.reply('new-task-created')
})

//CRUD READ >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// passo 2(slide ) fazer uma busca no banco de dados de todas as terrefas pendentes
ipcMain.on('get-tasks', async(event, args) => {
  const TarefasPendentes = await Tarefa.find() // buscar "select"
  console.log(TarefasPendentes)//passo 2 fins didáticos (Teste)
  //passo 3 (slide) enviar para o renderer(view) as Tarefas pendentes
  event.reply('pending-tasks',JSON.stringify(TarefasPendentes))// JSON.stringify - converte para o estado json
})