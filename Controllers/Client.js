const client = require('../Models/Client');

const addClient = (req,res) => {
    const {name,email,company,city,phoneNumber} = req.body;
    const newClient = new  client({name,email,company,city,phoneNumber});
    newClient.save().then((data)=> {
        res.json(data)
    }).catch((error)=>res.status(400).json('Error: '+error));
}

const getClients = (req,res) => {
    client.find().then((clients)=>res.json(clients)).catch((error)=>res.status(400).json('Error: '+error));
}

const getClient = (req,res) => {
    client.findById(req.params.id).then((client)=>res.json(client)).catch((error)=>res.status(400).json('Error: '+error));
}

const deleteClient = (req,res) => {
    client.findByIdAndDelete(req.params.id).then(()=>res.json('Client deleted')).catch((error)=>res.status(400).json('Error: '+error));
}

const updateClient = (req,res) => {
    client.findById(req.params.id).then((client)=>{
        client.name = req.body.name;
        client.email = req.body.email;
        client.company = req.body.company;
        client.city = req.body.city;
        client.phoneNumber = req.body.phoneNumber;
        client.save().then((data)=>res.json(data)).catch((error)=>res.status(400).json('Error: '+error));
    }
    ).catch((error)=>res.status(400).json('Error: '+error));
}


module.exports = {addClient, getClients, getClient, deleteClient, updateClient};