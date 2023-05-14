import fs from "fs"

class ProductManager {
  #path
  #writeFile = (content) => {
    fs.writeFileSync(this.#path, JSON.stringify(content, null, "\t"))
  }

  constructor(filename) {
    this.#path = filename
  }

  addProduct = ({ title, description, code, price, status, stock, category, thumbnails }) => {
    if (!title || !description || !code || !price || status === undefined || !stock || !category) {
      console.error("Missing parameters")
      return
    }

    const products = this.getProducts()

    if (products.find((product) => product.code === code)) {
      console.error(`The product of code: "${code}" already exists`)
      return
    }

    let producto = {
      title: title,
      description: description,
      code: code,
      price: price,
      status: status === undefined ? true : status,
      stock: stock,
      category: category,
      thumbnails: thumbnails ? thumbnails : [],
      id: products.length ? products[products.length - 1].id + 1 : 1
    }

    products.push(producto)
    this.#writeFile(products)
  }

  getProducts = () => {
    return JSON.parse(fs.readFileSync(this.#path, "utf-8"))
  }

  getProductById = (id) => {
    const products = this.getProducts()
    let product = products.find((product) => product.id === id);

    if (!product) {
      console.error("Not found")
    }
    return product
  }

  updateProduct = (id, object) => {
    const products = this.getProducts()
    const product = products.find(prod => prod.id === id)
    if (!product) {
      console.error("Not found")
      return
    }

    for (const key in object) {
      if (key && key !== "code" && key !== "id") {
        product[key] = object[key]
      }
    }
    this.#writeFile(products)
  }

  deleteProduct = (id) => {
    const products = this.getProducts()
    const index = products.findIndex(prod => prod.id === id)

    index >= 0 && products.splice(index, 1)
    this.#writeFile(products)
  }
}

export default ProductManager