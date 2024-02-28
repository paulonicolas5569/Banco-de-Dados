/**
 * Módulo de conexão com o banco de dados
 */

const mongoose = require('mongoose')

//Obter do compass (string para conexão com o banco)
let url = "mongodb+srv://nicolas:123senac@clusterpns.cvdn9d9.mongodb.net/Tarefas"

//Função para conectar o banco  (async = fazer a função assicrona) (async sempre junto com await)
const conectar = async () => {
    //Tratamento de exceção
    try {
        await mongoose.connect(url)
        console.log("Conectado")
    } catch (error) {
        console.log("Problema detectado: ", error.message)
        throw error
    }
}


//Função para desconectar o banco
const desconectar = async () => {
    try {
        await mongoose.disconnect(url)
        console.log("Desconectado")
    } catch (error) {
        console.log("Problema detectado: ", error.message)
        throw error
    }
}


//exportar um módulo -> main.js
module.exports = {conectar, desconectar}