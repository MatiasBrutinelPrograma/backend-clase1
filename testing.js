const ProductManager = require('./ProductManager');

const path = 'data.json'; // Ruta al archivo JSON

// Crear una instancia del ProductManager
const productManager = new ProductManager(path);

// Función para probar obtener un producto por su ID
function getProductById() {
  try {
    const productId = 1; // ID del producto a buscar (cambiado para un producto existente en el archivo JSON)
    const product = productManager.getProductById(productId);
    console.log('Producto por ID:', product);
  } catch (error) {
    console.error('Error:', error.message); // Manejo del error utilizando try-catch, el mensaje de error viene en error.message
  }
}

// Llamar a la función para probar obtener un producto por su ID
getProductById();

// **Prueba: Agregar un producto**
try {
  productManager.addProduct(newProduct);
  console.log('Producto agregado con éxito');
} catch (error) {
  console.error('Error al agregar producto:', error.message); // Manejo del error utilizando try-catch, el mensaje de error viene en error.message
}

// **Prueba: Obtener todos los productos**
const products = productManager.getProducts();
console.log('Productos:', products);

// **Prueba: Actualizar un producto**
try {
  productManager.updateProduct(productId, updatedProduct);
  console.log('Producto actualizado con éxito');
} catch (error) {
  console.error('Error al actualizar producto:', error.message); // Manejo del error utilizando try-catch, el mensaje de error viene en error.message
}

// **Prueba: Eliminar un producto**
// **Elimina el comentario para eliminar el producto**
// productManager.deleteProduct(productId);
// console.log('Producto eliminado con éxito');
