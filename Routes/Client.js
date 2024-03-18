const express = require('express')
const {updateClient} = require("../Controllers/Client");
const router = express.Router();
 const {addClient,getClients,getClient,deleteClient} = require("../Controllers/Client");

router.post('/add', addClient);
router.get('/get', getClients);
router.get('/get/:email', getClient);
router.delete('/delete/:id', deleteClient);
router.post('/update/:id', updateClient);


module.exports = router;