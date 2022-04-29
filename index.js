require('dotenv').config();

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const { routerProducts } = require('./controllers/products');
const { routerSales } = require('./controllers/sales');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', routerProducts);

app.use('/sales', routerSales);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
