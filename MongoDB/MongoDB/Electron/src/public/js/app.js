//Processos (Front-end)
console.log("Processo de renderização(front-end)")

// Exemplo de comunicação entre processos (front-ent e back-end)
const {ipcRenderer} = require('electron')
// Enviar uma mensagem ao processo principal 
ipcRenderer.send('send-message', "Oi!")
// Receber uma mensagem  do processo Principal
ipcRenderer.on('receive-message',(event,message) =>{
    console.log("Mensagem Recebida:", message)
})