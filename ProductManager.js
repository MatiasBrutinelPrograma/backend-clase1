const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct(product) {
    // Validar que todos los campos sean obligatorios
    if (!this._validateProduct(product)) {
      throw new Error('Todos los campos son obligatorios');
    }

    // Leer productos actuales del archivo
    let products = this._readProducts();

    // Asignar ID autoincrementable
    const maxId = products.reduce((max, p) => (p.id > max ? p.id : max), 0);
    product.id = maxId + 1;

    // Agregar el producto al array
    products.push(product);

    // Escribir productos actualizados al archivo
    this._writeProducts(products);
  }

  getProducts() {
    // Devolver todos los productos del archivo
    return this._readProducts();
  }

  getProductById(id) {
    // Obtener producto por ID del archivo
    const products = this._readProducts();
    const product = products.find(p => p.id === id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  }

  updateProduct(id, updatedFields) {
    // Leer productos actuales del archivo
    let products = this._readProducts();

    // Encontrar el índice del producto a actualizar
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Producto no encontrado');
    }

    // Actualizar el producto con los campos proporcionados
    products[index] = { ...products[index], ...updatedFields };

    // Escribir productos actualizados al archivo
    this._writeProducts(products);
  }

  deleteProduct(id) {
    // Leer productos actuales del archivo
    let products = this._readProducts();

    // Filtrar productos para excluir el producto con el ID proporcionado
    products = products.filter(p => p.id !== id);

    // Escribir productos actualizados al archivo
    this._writeProducts(products);
  }

  _validateProduct(product) {
    return (
      product.title &&
      product.description &&
      product.price &&
      product.thumbnail &&
      product.code &&
      product.stock !== undefined
    );
  }

  _readProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe o hay un error al leerlo, devolver un array vacío
      return [];
    }
  }

  _writeProducts(products) {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
  }
}

module.exports = ProductManager;
