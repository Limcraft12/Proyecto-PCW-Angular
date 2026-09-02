console.log("EL ARCHIVO SI SE ESTA EJECUTANDO");

import { pool } from "./db.js";

const crearTabla = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS public.clientes (
                id_cliente SERIAL PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                correo VARCHAR(150) NOT NULL,
                telefono VARCHAR(20) NOT NULL
            );
        `);

        console.log("Tabla clientes creada correctamente");
    } catch (error) {
        console.error("Error al crear la tabla clientes:", error);
    } finally {
        await pool.end();
    }
};

crearTabla();