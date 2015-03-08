// FICHERO DEL MODELO DE DATOS PARA MONGODB

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var speakerSchema = new Schema({
	titulo: {type: String},
	descripcion: {type: String, default: ''},
	duracion: {type: Number, default: 0},
	lanzamiento : {type: Date, default: Date.now}
});

// Se exporta con nombre 'Speaker' el Schema de MongoDB
module.exports = mongoose.model('Speaker', speakerSchema);