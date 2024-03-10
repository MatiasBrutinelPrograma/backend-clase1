class ProductManager {
    constructor(products) {
      this.products = products;
      this.id = 0;
    }
  
    addProduct(product) {
      // Validar que todos los campos sean obligatorios
      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
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
    }
  
    getProducts() {
      return this.products;
    }
  }
  
  // Ejemplo de uso
  const productManager = new ProductManager([]);
  
  const product1 = {
    title: 'Producto 1',
    description: 'Descripción del producto 1',
    price: 100,
    thumbnail: 'ruta/imagen1.jpg',
    code: 'ABC123',
    stock: 10,
  };
  
  const product2 = {
    title: 'Producto 2',
    description: 'Descripción del producto 2',
    price: 200,
    thumbnail: 'ruta/imagen2.jpg',
    code: 'DEF456',
    stock: 20,
  };
  
  productManager.addProduct(product1);
  productManager.addProduct(product2);
  
  const products = productManager.getProducts();
  
  console.log(products);
  