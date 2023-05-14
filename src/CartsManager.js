import fs from "fs"

class CartsManager {
  #path
  #writeFile = (content) => {
    fs.writeFileSync(this.#path, JSON.stringify(content, null, "\t"))
  }

  constructor(filename) {
    this.#path = filename
  }

  crearCarrito = () => {
    const carritos = this.getCarritos()
    carritos.push({
      id: carritos.length ? carritos[carritos.length - 1].id + 1 : 1,
      products: []
    })
    this.#writeFile(carritos)
  }

  getCarritos = () => {
    console.log(JSON.parse(fs.readFileSync(this.#path, "utf-8")))
    return JSON.parse(fs.readFileSync(this.#path, "utf-8"))
  }

  getCarritoById = (id) => {
    const carts = this.getCarritos()
    return carts.find((cart) => cart.id === Number(id))
  }

  getCarritoProducts = (id) => {
    const carritos = this.getCarritoById(id)
    return carritos ? carritos.products : undefined
  }

  addItemToCarrito = (cid, pid) => {
    if (!cid || !pid) {
      console.error("Missing parameters")
      return
    }
    const carts = this.getCarritos()
    const indexCart = carts.findIndex((cart) => cart.id === cid)
    if (indexCart < 0) {
      console.error("Cart not found")
      return
    }
    const indexProd = carts[indexCart].products.findIndex(prod => prod.product === pid)
    if (indexProd < 0) {
      carts[indexCart].products.push({ product: pid, quantity: 1 })
    } else {
      carts[indexCart].products[indexProd].quantity++
    }
    this.#writeFile(carts)
  }
}

export default CartsManager