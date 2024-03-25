const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path; 
    this.products = [];
    this.id = 0; 
  }

  // Método para agregar un nuevo producto
  async addProduct(product) {
    // Validar que todos los campos del producto sean obligatorios
    if (!this._validateProduct(product)) {
      throw new Error('Todos los campos son obligatorios');
    }

    // Validar que el código del producto no esté duplicado
    const existingProduct = this.products.find(p => p.code === product.code);
    if (existingProduct) {
      throw new Error('El código del producto ya existe');
    }

    // Asignar un ID autoincrementable al producto
    this.id++;
    product.id = this.id;

    // Agregar el producto a la lista de productos en memoria
    this.products.push(product);

    // Guardar los cambios en el archivo JSON
    await this._saveProducts();
  }

  // Método para obtener todos los productos
  async getProducts(limit) {
    // Leer el archivo JSON y convertirlo a un array de objetos de productos
    const productsData = await fs.promises.readFile(this.path, 'utf8');
    let products = JSON.parse(productsData);

    // Limitar el número de productos si se proporciona un límite
    if (limit) {
      products = products.slice(0, limit);
    }

    return products;
  }

  // Método para obtener un producto por su ID
  async getProductById(id) {
    // Leer el archivo JSON y convertirlo a un array de objetos de productos
    const productsData = await fs.promises.readFile(this.path, 'utf8');
    const products = JSON.parse(productsData);

    // Buscar el producto con el ID especificado
    const product = products.find(p => p.id === id);
    return product;
  }

  // Método para actualizar un producto
  async updateProduct(id, updatedProduct) {
    // Buscar el producto con el ID especificado
    const product = this.products.find(p => p.id === id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }

    // Actualizar el producto con la nueva información
    for (const key in updatedProduct) {
      product[key] = updatedProduct[key];
    }

    // Guardar los cambios en el archivo JSON
    await this._saveProducts();
  }

  // Método para eliminar un producto
  async deleteProduct(id) {
    // Buscar el índice del producto con el ID especificado
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }

    // Eliminar el producto del array de productos
    this.products.splice(productIndex, 1);

    // Guardar los cambios en el archivo JSON
    await this._saveProducts();
  }

  // Método interno para validar que todos los campos de un producto sean obligatorios
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

  // Método interno para guardar los productos en el archivo JSON
  async _saveProducts() {
    // Convertir el array de productos a formato JSON
    const productsData = JSON.stringify(this.products, null, 2);
    // Guardar los productos en el archivo JSON
    await fs.promises.writeFile(this.path, productsData + '\r\n');
  }
}

module.exports = ProductManager;

