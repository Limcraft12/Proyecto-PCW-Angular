import { Router } from "express"
import { getAllProductos, getOneProductos, saveProducto, editarProducto, eliminarProducto } from "../controllers/productos.controller.js"

const router = Router()

// Tener las rutas necesarias para generar nuestro CRUD

router.get("/productos/getall", getAllProductos)
router.get("/productos/getone/:id", getOneProductos)
router.post("/productos/save", saveProducto)
router.put('/productos/editar/:id', editarProducto)
router.delete('/productos/eliminar/:id', eliminarProducto)

export default router