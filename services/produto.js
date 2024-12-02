const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: String,
  preco: { type: Number, required: true },
  // ... outros campos do seu produto
});

const Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto;