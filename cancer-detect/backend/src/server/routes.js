// routes.js

const { postPredictHandler, handleGetHistories } = require('../server/handler'); // Tambahkan impor getPredictionHistoriesHandler

const routes = [
    {
        path: '/predict',
        method: 'POST',
        handler: postPredictHandler,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true
            }
        }
    },
    {
        method: 'GET',
        path: '/predict/histories',
        handler: handleGetHistories, // Tambahkan route baru untuk endpoint GET /predict/histories
    },
];

module.exports = routes;