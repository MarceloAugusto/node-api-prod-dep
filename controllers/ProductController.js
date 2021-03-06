const Pool = require('pg').Pool
const pool = new Pool({
    user: 'ezattaequipamentos',
    host: 'pgsql.ezattaequipamentos.com.br',
    database: 'ezattaequipamentos',
    password: 'Uberaba123',
    port: 5432,
})
const multer = require('multer');
const upload = multer({
  dest: 'uploads/' // this saves your file into a directory called "uploads"
}); 

const getProducts = (request, response) => {
    pool.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getProductById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM products WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createProduct = (request, response) => {
    const name = request.body.name
    const departments = request.body.departments
    const stock = request.body.stock
    const price = request.body.price
    const photo = "request.body.photo"

    pool.query('INSERT INTO products (name, departments, stock, price, photo) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
    [name, departments, stock, price, photo], 
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).json(results.rows[0]);
    })
}

const updateProduct = (request, response) => {
    const id = parseInt(request.params.id)
    const name = request.body.name
    const departments = request.body.departments
    const stock = request.body.stock
    const price = request.body.price
    const photo = "request.body.photo"

    pool.query(
        'UPDATE products SET name = $1,departments = $2,stock = $3,price = $4,photo = $5 WHERE id = $6  RETURNING *',
        [name, departments, stock, price, photo, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows[0]);
        }
    )
}

const deleteProduct = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send({});
    })
}

// const uploadProduct = (request, response) => {
//     const file = req.files.photo;
//     file.mv('./uploads/' + file.name, function(err, result) {
//      if(err) 
//       throw err;
//      res.send({
//       success: true,
//       message: "File uploaded!"
//      });
//     })
// }

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    // uploadProduct
}