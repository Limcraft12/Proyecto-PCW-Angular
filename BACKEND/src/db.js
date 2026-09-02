import pg from "pg"

export const pool = new pg.Pool({
    user:"postgres",
    host:"localhost",
    password:"postgres",
    database:"pcw",
    port:"5432"
})