const Pool = require('pg').Pool
const pool = new Pool({
    user: 'ezattaequipamentos',
    host: 'pgsql.ezattaequipamentos.com.br',
    database: 'ezattaequipamentos',
    password: 'Uberaba123',
    port: 5432,
})
const bcrypt = require('bcryptjs');
const consts = require('../consts');
const jwt = require('jsonwebtoken');

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { firstname, lastname, address, city, state, phone, mobilephone, email, password} = request.body

    pool.query('INSERT INTO users (name, firstname, lastname, address, city, state, phone, mobilephone, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', 
    [firstname, firstname, lastname, address, city, state, phone, mobilephone, email, bcrypt.hashSync(password, consts.bcryptSalts)], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).json(results.rows[0]);
    })
}

const login = (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    // const id = parseInt(req.body.id)

    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
        if (error) {
            throw error
        }

        // let restt = bcrypt.compareSync(password, results.rows[0].password);
        
         if (!bcrypt.compareSync(req.body.password, results.rows[0].password)) {
            let token = jwt.sign({id: results.rows[0].id}, consts.keyJWT,{expiresIn: consts.expiresJWT});
            res.status(200).json({...results.rows[0], token: token});
            }else{
            res.status(500).json([]);
         }

    })
    
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body

    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )

    
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
}