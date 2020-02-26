var express = require("express");
var router = express.Router();
const userController = require('../controllers/UserControll')
const departamentControll = require('../controllers/DepartamentControll')
const productController = require('../controllers/ProductController')
// var AuthController = require('../controllers/AuthController');

// router.use(AuthController.check_token);

router.get('/people', userController.getUsers);
// router.get('/products', ProductController.all);

router.get('/users', userController.getUsers)
router.get('/users/:id', userController.getUserById)
router.post('/auth/register', userController.createUser)
router.post('/auth/loginn', userController.login)
router.put('/users/:id', userController.updateUser)
router.delete('/users/:id', userController.deleteUser)

router.get('/departments', departamentControll.getDepartments)
router.get('/departments/:id', departamentControll.getDepartmentById)
router.post('/departments', departamentControll.createDepartment)
router.put('/departments/:id', departamentControll.updateDepartment)
router.delete('/departments/:id', departamentControll.deleteDepartment)

router.get('/products', productController.getProducts)
router.get('/products/:id', productController.getProductById)
router.post('/products', productController.createProduct)
router.put('/products/:id', productController.updateProduct)
router.delete('/products/:id', productController.deleteProduct)
// router.post('/products/upload',  productController.uploadProduct)//upload.single('file-to-upload'),

module.exports = router;