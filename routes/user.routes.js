const userController = require('../controllers/userController')

const router = require('express').Router()

router.post('/registerUser', userController.registerUser)
router.post('/loginUser', userController.loginUser)
router.post('/updateUser', userController.updateUser)
router.get('/getUsers', userController.getAllUsers)
router.get('/:id', userController.getSingleUsers)
router.put('/:id', userController.udpateUsers)
router.delete('/:id', userController.deleteUsers)

module.exports = router