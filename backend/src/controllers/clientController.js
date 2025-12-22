const clientService = require('../service/clientService');

const listClients = async (req, res) => {

    try {

        const clients = await clientService.getClients();

        return res.status(200).json({ data: clients });

    } catch(err) {

        return res.status(400).json({ error: err.message });

    }
}

module.exports = {
    listClients: listClients
}