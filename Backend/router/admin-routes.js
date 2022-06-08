const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

// POST admin/create
router.post('/create', isAuth, adminController.create);

// GET admin/load
router.get('/loadAll', isAuth, adminController.loadAll);


// DELETE admin/deleteOne
router.delete('/deleteOne/:id', isAuth, adminController.deleteItem);

module.exports = router;
