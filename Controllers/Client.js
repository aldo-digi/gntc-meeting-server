const client = require('../models/Client');

export const addClient = (req,res) => {
    const {firstName,lastName,email,position,gender,city} = req.body;
    const newClient = new  client({firstName,lastName,email,position,gender,city});
    newClient.save().then(()=>res.json('Client added')).catch((error)=>res.status(400).json('Error: '+error));
}

export const getClients = (req,res) => {
    client.find().then((clients)=>res.json(clients)).catch((error)=>res.status(400).json('Error: '+error));
}

export const getClient = (req,res) => {
    client.findById(req.params.id).then((client)=>res.json(client)).catch((error)=>res.status(400).json('Error: '+error));
}

export const deleteClient = (req,res) => {
    client.findByIdAndDelete(req.params.id).then(()=>res.json('Client deleted')).catch((error)=>res.status(400).json('Error: '+error));
}

export const updateClient = (req,res) => {
    client.findById(req.params.id).then((client)=>{
        client.firstName = req.body.firstName;
        client.lastName = req.body.lastName;
        client.email = req.body.email;
        client.position = req.body.position;
        client.gender = req.body.gender;
        client.city = req.body.city;
        client.meetings = req.body.meetings;
        client.save().then(()=>res.json('Client updated')).catch((error)=>res.status(400).json('Error: '+error));
    }
    ).catch((error)=>res.status(400).json('Error: '+error));
}

