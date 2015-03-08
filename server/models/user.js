var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// Encriptar la password del usuario
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
	local : {
		email: {type: String},
		password:  {type: String}
	}
});

/* Se definen metodos para el modelo del Usuario */
// generating a hash
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// validating if password is valid
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);