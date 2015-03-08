// Fichero de rutas para el moddelo --> API REST

var express = require('express'),
	router = express.Router(),
	Speaker = require('../models/speaker.js');


// GET
router.get('/speakers', function(req, res) {
	console.log('Get all speakers');
	Speaker.find(function (err, data) {
		if (!err) {
			res.json(data);	
		} else{
			res.json({message: 'Error al recuperar todos los datos'});
		}
		
	});
});

// GET por ID
router.get('/speakers/:speaker_id', function(req, res) {
	console.log('Get speakers by id');
	Speaker.findById(req.params.speaker_id, function (err, data) {
		if (!err) {
			res.json(data);	
		} else{
			res.json({message: 'Error al recuperar el speaker con id' + req.param.speaker_id});
		}
		
	});
});

// POST - Guardar
router.post('/speakers', function(req, res) {
	var nuevo = new Speaker();
	nuevo.titulo = req.body.titulo;
	nuevo.descripcion = req.body.descripcion;
	nuevo.duracion = req.body.duracion;
	nuevo.lanzamiento = req.body.lanzamiento;

	nuevo.save(function(err) {
		if (err) {
			res.send(err);	
		} else{
			res.json({message: 'Guardado completado!'});
		}
	});
});

// PUT - Actualizar
router.put('/speakers/:speaker_id', function(req, res) {
	Speaker.findById(req.params.speaker_id, function (err, data) {
		if (!err) {
			data.titulo = req.body.titulo;
			data.descripcion = req.body.descripcion;
			data.duracion = req.body.duracion;
			data.lanzamiento = req.body.lanzamiento;

			data.save(function(err) {
				if (err) {
					res.send(err);	
				} else{
					res.json({message: 'Modificación completada!'});
				}
			});
		} else{
			res.json({message: 'Error al recuperar el speaker con id' + req.param.speaker_id});
		}		
	});
});

// DELETE
router.delete('/speakers/:speaker_id', function(req, res) {
	Speaker.remove({ _id: req.params.speaker_id }, function (err, data) {
		if (!err) {			
			res.json({message: 'Eliminacion completada!'});
		} else{
			res.send(err);
		}		
	});
});


// Se exporta el objeto router para que se pueda usar en el server.js
module.exports = router;	