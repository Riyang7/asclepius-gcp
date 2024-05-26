const { Firestore } = require('@google-cloud/firestore');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const firestore = new Firestore();

const storePrediction = async (prediction) => {
  try {
    const { id, result, suggestion, createdAt } = prediction;
    await firestore.collection('predictions').doc(id).set({
      id,
      result,
      suggestion,
      createdAt
    });
    return id;
  } catch (error) {
    console.error('Error storing prediction:', error);
    throw new Error('Failed to store prediction');
  }
};

const getPredictionHistories = async () => {
  try {
    const snapshot = await firestore.collection('predictions').get();
    if (snapshot.empty) {
      return [];
    }
    const histories = snapshot.docs.map(doc => ({
      id: doc.id,
      history: {
        result: doc.data().result,
        createdAt: doc.data().createdAt,
        suggestion: doc.data().suggestion,
        id: doc.id
      }
    }));
    return histories;
  } catch (error) {
    console.error('Error fetching prediction histories:', error);
    throw new Error('Failed to fetch prediction histories');
  }
};

module.exports = { storePrediction, getPredictionHistories };