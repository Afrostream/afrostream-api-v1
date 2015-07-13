
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubscriptionSchema = new Schema({
	recurlyId: {type: String, unique: true, trim: true, required: true},
	email: {type: String, unique: true, lowercase: true, trim: true},
	planCode: {type: String},
	activeStatus: {type: Boolean}
});

SubscriptionSchema.static('findByEmail', function (email, callback) {
	return this.find({ email: email }, callback);
});

module.exports = mongoose.model('Subscriptions', SubscriptionSchema);