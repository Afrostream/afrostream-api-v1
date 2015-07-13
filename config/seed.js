/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Subscription = require('../api/subscriptions/subscriptions.model');


Subscription.find({}).remove(function() {
	Subscription.create({
			recurlyId: 'testRecurlyId01',
			email: 'johnarch@afrostream.tv',
			planCode: null,
			activeStatus: false
		}, {
			recurlyId: 'testRecurlyId02',
			email: 'pott.benjamin@gmail.com',
			planCode: 'afrostreampremium',
			activeStatus: true
		}, function() {
			console.log('finished populating users');
		}
	);
});