const fs = require('fs');
const path = require('path');

exports.getEndpoints = (req, res, next) => {
    const endpointsFilePath = path.join(__dirname, '../endpoints.json');
    fs.readFile(endpointsFilePath, 'utf8', (err, data) => {
        if (err) {
            next(err);
            return;
        }

        const endpoints = JSON.parse(data);
        res.status(200).send({ endpoints });
    });
};