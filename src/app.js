const express = require('express');
const { productsControllers, salesControllers } = require('./controllers');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsControllers.findAll);
app.post('/products', productsControllers.insert);
app.get('/products/:id', productsControllers.findById);
app.put('/products/:id', productsControllers.update);
app.delete('/products/:id', productsControllers.remove);
app.get('/sales', salesControllers.findAll);
app.get('/sales/:id', salesControllers.findById);
app.post('/sales', salesControllers.insert);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;