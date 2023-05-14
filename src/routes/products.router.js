import { Router } from "express";
import ProductManager from "../ProductManager.js"

const router = Router()
const manager = new ProductManager("src/productos.json")

router.get("/", (req, res) => {
  const limit = req.query.limit
  let productos = manager.getProducts()
  productos = productos.slice(0, limit)

  res.send({ productos: productos })
})

router.get("/:pid", (req, res) => {
  const id = Number(req.params.pid)
  const producto = manager.getProductById(id)
  res.send(producto ? producto : { error: "El producto no existe" })
})

router.post("/", (req, res) => {
  const product = req.body
  console.log(req.body)
  manager.addProduct(product)
  res.json({ productos: manager.getProducts() })
})

router.put("/:pid", (req, res) => {
  const id = Number(req.params.pid)
  const body = req.body
  manager.updateProduct(id, body)
  res.json({ productos: manager.getProducts() })
})

router.delete("/:pid", (req, res) => {
  const id = Number(req.params.pid)
  manager.deleteProduct(id)
  res.json({productos: manager.getProducts()})
})

export default router