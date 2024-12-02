import { Router } from 'express';
import fs from 'fs';
import handlebars from 'handlebars';

const router = Router();

router.get('/produtos', (req, res) => {
  res.send('Rota de produtos funcionando!');
});

// ... outras rotas ...

router.get('/produtos/pdf', async (_req, res) => {
  try {
    // Consulta ao banco de dados com Mongoose (simulação por enquanto)
    const produtos = [
      { nome: 'Produto A', descricao: 'Descrição do Produto A', preco: 10.99 },
      { nome: 'Produto B', descricao: 'Descrição do Produto B', preco: 20.50 },
      { nome: 'Produto C', descricao: 'Descrição do Produto C', preco: 5.75 },
    ];

    // Geração do template HTML com Handlebars
    const template = handlebars.compile(fs.readFileSync('produtos.hbs', 'utf8'));
    const html = template({ produtos: produtos });

    // Geração do PDF com Pandoc
    const { exec } = require('child_process');
    exec(`echo "${html}" | pandoc -s -o produtos.pdf`, (error, _stdout, _stderr) => {
      if (error) {
        console.error(`Erro ao gerar PDF: ${error}`);
        return res.status(500).send('Erro ao gerar PDF');
      }
      console.log(`PDF gerado com sucesso!`);
      res.download('produtos.pdf');
    });
  } catch (err) {
    console.error(`Erro ao gerar PDF: ${err}`);
    return res.status(500).send('Erro ao gerar PDF');
  }
});

// ... outras rotas ...
router.post('/produtos', async (req, res) => {
  try {
    const { nome, descricao, preco } = req.body;

    // Criar um novo produto com o Mongoose
    const novoProduto = new Produto({
      nome,
      descricao,
      preco,
    });

    // Salvar o produto no banco de dados
    await novoProduto.save();

    res.status(201).json(novoProduto); // Retornar o produto criado com status 201 (Created)
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao criar produto');
  }
});

export default router;