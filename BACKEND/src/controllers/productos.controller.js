import { pool } from "../db.js"

export const getAllProductos = async (req, res) => {
    const data = await pool.query("SELECT id_producto, descripcion, precio FROM public.productos;")
    // console.log(data)
    res.json(data.rows)
}

export const getOneProductos = async (req, res) => {
    const id = req.params.id
    const data = await pool.query("SELECT id_producto, descripcion, precio FROM public.productos WHERE id_producto = $1;", [id])
    // console.log(data)
    res.json(data.rows)
}

export const saveProducto = async (req, res) => {
    try {
        console.log(req.body)
        const { descripcion, precio } = req.body
        const respuesta = await pool.query(
            "INSERT INTO public.productos (descripcion, precio) VALUES($1, $2);",
            [descripcion, precio]
        )
        res.json({res: "PRODUCTO CREADO DE MANERA CORRECTA"})
    } catch (error) {
        console.log(error)
        res.json({res: "EL PRODUCTO NO HA SIDO CREADO"})
    }
}

export const editarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion, precio } = req.body;
        const { rowCount, rows } = await pool.query(
            `UPDATE public.productos 
             SET descripcion = $1, precio = $2 
             WHERE id_producto = $3 
             RETURNING *;`,
            [descripcion, precio, id]
        );
        if (rowCount === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { rowCount } = await pool.query(
            "DELETE FROM public.productos WHERE id_producto = $1;",
            [id]
        );
        if (rowCount === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json({ message: "Producto eliminado correctamente" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};