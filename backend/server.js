import express from 'express';
import data from './data.js';

const app = express();

app.get('/api/products', (req, res) => {
    res.send(data.products)
})






const port = 5000;
app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`)
})