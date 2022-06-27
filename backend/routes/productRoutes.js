import express from 'express';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
    try {
        const products = await Product.find();

        res.send(products); 
    } catch (error) {
        console.log(error)
    }

})

//get one by slug
productRouter.get("/slug/:slug", async (req, res) => {
    const product = await Product.findOne({slug: req.params.slug});
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({message: "Product unavailable"})
    }
})

//get one by id
productRouter.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({message: "Product unavailable"})
    }
})

export default productRouter;



