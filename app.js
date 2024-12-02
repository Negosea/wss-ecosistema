import express from 'express';
const app = express();
const port = 3001;


// Conexão com o MongoDB
import mongoose from 'mongoose';

const { connect, connection } = mongoose;
connect('mongodb://localhost:27017/wss-database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', function () {
  console.log('Conectado ao MongoDB!');
});

// Middleware para tratamento de erros
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send('Erro interno do servidor!');
});

// Rotas do produto
import productRoutes from './routes/app.js'; // Importação corrigida
app.use('/api', productRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

app.get('/', (_req, res) => {
  res.send('Servidor backend do projeto WSs!');
});