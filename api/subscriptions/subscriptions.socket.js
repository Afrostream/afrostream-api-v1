/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Subscription = require('./subscriptions.model');

exports.register = function (socket) {
	Subscription.schema.post('save', function (doc) {
		onSave(socket, doc);
	});
	Subscription.schema.post('remove', function (doc) {
		onRemove(socket, doc);
	});
}

function onSave(socket, doc, cb) {
	socket.emit('subscriptions:save', doc);
}

function onRemove(socket, doc, cb) {
	socket.emit('subscriptions:remove', doc);
}