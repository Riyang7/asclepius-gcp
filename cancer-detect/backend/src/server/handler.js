const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const { storePrediction, getPredictionHistories } = require('../services/storeData');

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { label, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id,
    result: label,
    suggestion,
    createdAt
  };

  await storePrediction(data);

  const response = h.response({
    status: 'success',
    message: 'Model is predicted successfully',
    data
  });

  response.code(201);
  return response;
}

const handleGetHistories = async (request, h) => {
  try {
    const histories = await getPredictionHistories();
    return h.response({
      status: 'success',
      data: histories,
    }).code(200);
  } catch (error) {
    return h.response({
      status: 'fail',
      message: 'Failed to fetch prediction history',
    }).code(500);
  }
};

module.exports = { postPredictHandler, handleGetHistories };
