const express = require('express')
const router = express.Router();

router.post('/add', require('../Controllers/Client').addClient);
router.get('/get', require('../Controllers/Client').getClients);
router.get('/get/:id', require('../Controllers/Client').getClient);
router.delete('/delete/:id', require('../Controllers/Client').deleteClient);
router.post('/update/:id', require('../Controllers/Client').updateClient);
