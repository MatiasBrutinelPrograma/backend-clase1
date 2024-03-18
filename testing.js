const ProductManager = require('./ProductManager');

const path = 'data.json'; // Ruta al archivo JSON

// Crear una instancia del ProductManager
const productManager = new ProductManager(path);

// **Prueba: Agregar un producto**
const newProduct = {
  title: 'Producto de prueba',
  description: 'Descripción del producto de prueba',
  price: 200,
  thumbnail: 'ruta/imagen2.jpg',
  code: 'DEF456',
  stock: 5,
};

try {
  productManager.addProduct(newProduct);
  console.log('Producto agregado con éxito');
} catch (error) {
  console.error('Error al agregar producto:', error.message);
}

// **Prueba: Obtener todos los productos**
const products = productManager.getProducts();
console.log('Productos:', products);

// **Prueba: Obtener un producto por ID**
const productId = 1;
const product = productManager.getProductById(productId);
if (product) {
  console.log('Producto por ID:', product);
} else {
  console.error('Producto no encontrado con ID:', productId);
}

// **Prueba: Actualizar un producto**
const updatedProduct = {
  title: 'Producto actualizado',
  description: 'Descripción actualizada del producto de prueba',
  price: 300,
  thumbnail: 'ruta/imagen3.jpg',
  code: 'DEF456',
  stock: 10,
};

try {
  productManager.updateProduct(productId, updatedProduct);
  console.log('Producto actualizado con éxito');
} catch (error) {
  console.error('Error al actualizar producto:', error.message);
}

// **Prueba: Eliminar un producto**
// **Elimina el comentario para eliminar el producto**
// productManager.deleteProduct(productId);
// console.log('Producto eliminado con éxito');
