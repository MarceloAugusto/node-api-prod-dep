const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api',
    password: 'vertrigo',
    port: 5432,
})

const getDepartments = (request, response) => {
    pool.query('SELECT * FROM departments ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getDepartmentById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM departments WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createDepartment = (request, response) => {
    const name = request.body.name

    console.log("name",name);

    pool.query('INSERT INTO departments (name) VALUES ($1) RETURNING *', [name], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).json(results.rows[0]);
    })
}

const updateDepartment = (request, response) => {
    const id = parseInt(request.params.id)
    const name = request.body.name

    pool.query(
        'UPDATE departments SET name = $1 WHERE id = $2  RETURNING *',
        [name, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows[0]);
        }
    )
}

const deleteDepartment = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM departments WHERE id = $1 RETURNING *', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send({});
    })
}

module.exports = {
    getDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment,
}