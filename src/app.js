const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 3000; // Puerto en el que escuchará el servidor

const productManager = new ProductManager('data.json'); // Ruta al archivo JSON de productos

// Endpoint para obtener todos los productos
app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit; // Obtener el parámetro de consulta 'limit' si está presente
    let products;
    if (limit) {
      products = await productManager.getProducts(parseInt(limit)); // Convertir el límite a entero
    } else {
      products = await productManager.getProducts();
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obtener un producto por su ID
app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid); // Obtener el ID del producto de los parámetros de la solicitud
    const product = await productManager.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
