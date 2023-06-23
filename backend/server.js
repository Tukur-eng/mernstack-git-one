import express from 'express';
import mongoose from 'mongoose';
import data from './data.js';
import userRouter from './routers/userRouter.js';

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/vitabay');

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

app.get('/api/products', (req, res) => {
  res.send(data.products);
});
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.send('server is ready');
});

app.use((err, req, res) => {
    res.status(500).send({ message: err.message });
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
