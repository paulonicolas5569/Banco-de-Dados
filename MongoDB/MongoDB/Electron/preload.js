// Manipuloção DOM (tags, id oucclasses do Documento html)
window.addEventListener( "DOMContentLoaded", () => {
    const mensagem = document.getElementById("mensagem")
    mensagem.innerText = "Conteudo injetado pelo preload.js"
})