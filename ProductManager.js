const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.id = 0;
  }

  addProduct(product) {
    // Validar que todos los campos sean obligatorios
    if (!this._validateProduct(product)) {
      throw new Error('Todos los campos son obligatorios');
    }

    // Validar que no se repita el campo "code"
    const existingProduct = this.products.find(p => p.code === product.code);
    if (existingProduct) {
      throw new Error('El código del producto ya existe');
    }

    // Asignar ID autoincrementable
    this.id++;
    product.id = this.id;

    // Agregar el producto al array
    this.products.push(product);

    // Guardar los cambios en el archivo JSON (con CRLF)
    this._saveProducts();
  }

  getProducts() {
    // Leer el archivo JSON y convertirlo a un array de objetos
    const productsData = JSON.parse(fs.readFileSync(this.path, 'utf8'));
    this.products = productsData;

    return this.products;
  }

  getProductById(id) {
    // Buscar el producto con el ID especificado
    const product = this.products.find(p => p.id === id);

    // Si no se encuentra el producto, devolver un error
    if (!product) {
      throw new Error('Producto no encontrado');
    }

    return product;
  }

  updateProduct(id, updatedProduct) {
    // Buscar el producto con el ID especificado
    const product = this.products.find(p => p.id === id);

    // Si no se encuentra el producto, lanzar un error
    if (!product) {
      throw new Error('Producto no encontrado');
    }

    // Actualizar el producto con la nueva información
    for (const key in updatedProduct) {
      product[key] = updatedProduct[key];
    }

    // Guardar los cambios en el archivo JSON (con CRLF)
    this._saveProducts();
  }

  deleteProduct(id) {
    // Buscar el producto con el ID especificado
    const productIndex = this.products.findIndex(p => p.id === id);

    // Si no se encuentra el producto, lanzar un error
    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }

    // Eliminar el producto del array
    this.products.splice(productIndex, 1);

    // Guardar los cambios en el archivo JSON (con CRLF)
    this._saveProducts();
  }

  _validateProduct(product) {
    return (
      product.title &&
      product.description &&
      product.price &&
      product.thumbnail &&
      product.code &&
      product.stock
    );
  }

  _saveProducts() {
    // Convertir el array de productos a un string JSON (con CRLF)
    const productsData = JSON.stringify(this.products, null, 2);

    // Guardar el string JSON en el archivo (con CRLF)
    fs.writeFileSync(this.path, productsData + '\r\n');
  }
}

module.exports = ProductManager;
