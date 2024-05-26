const tf = require('@tensorflow/tfjs-node');

async function loadModel() {
    const modelUrl = 'https://storage.googleapis.com/sub-mlgc1/model-prod/model.json'; // URL tetap
    return tf.loadGraphModel(modelUrl);
}

module.exports = loadModel;