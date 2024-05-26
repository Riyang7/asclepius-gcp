const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

/**
 * Fungsi untuk melakukan klasifikasi gambar menggunakan model TensorFlow.
 * @param {tf.LayersModel} model Model TensorFlow yang akan digunakan untuk klasifikasi.
 * @param {Buffer} image Gambar yang akan diklasifikasikan dalam format Buffer.
 * @returns {Object} Objek hasil klasifikasi yang berisi confidence score, label prediksi, dan saran.
 * @throws {InputError} Jika terjadi kesalahan pada input gambar.
 */
async function predictClassification(model, image) {
  try {
    // Mengubah gambar menjadi tensor
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    // Melakukan prediksi menggunakan model
    const prediction = model.predict(tensor);

    // Mendapatkan nilai prediksi
    const score = await prediction.data();

    // Mendapatkan label prediksi
    const label = score[0] > 0.5 ? 'Cancer' : 'Non-cancer';

    // Menghitung confidence score
    const confidenceScore = Math.max(score[0], 1 - score[0]) * 100;

    // Menyusun saran berdasarkan label prediksi
    const suggestion = label === 'Cancer' ? 'Segera periksa ke dokter!' : 'Anda Sehat!';

    // Mengembalikan hasil klasifikasi
    return { confidenceScore, label, suggestion };
  } catch (error) {
    // Melempar InputError jika terjadi kesalahan pada input gambar
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}

module.exports = predictClassification;
