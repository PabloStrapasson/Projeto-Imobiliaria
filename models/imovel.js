const mongoose = require("mongoose");
const ImovelSchema = new mongoose.Schema({
    tipo:String,
    ndormitorios:Number,
    nbanheiros:Number,
    ngaragem:Number,
    endereco:String,
    descricao:String,
    ninscricao:Number,
    valor:Number,
    situacao:String,
    imagem0:String
}) ;
module.exports = mongoose.model("Imovel",ImovelSchema);
