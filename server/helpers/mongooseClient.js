/**
 * var config = require('./config');
 * var mongolabUristring = config.mongoloab.uristring;
 */

//TODO: this is staging mongolab, create a config object
var mongolabUristring = 'mongodb://afrostream:afr0str3am@ds047712.mongolab.com:47712/heroku_nd0hbtmt';

var http = require ('http');             // For serving a basic web page.
var mongoose = require ("mongoose"); // The reason for this demo.


function MongooseClient (subscriptionRequest, accountCode) {

	var self = {

		// Here we find an appropriate database to connect to, defaulting to
		// localhost if we don't find one.
		uristring:
		//process.env.MONGOLAB_URI ||
		//process.env.MONGOHQ_URL ||
			mongolabUristring,

		// The http server will listen to an appropriate port, or default to
		// port 5000.
		theport: process.env.PORT || 5000,

		subscription: subscriptionRequest,

		accountCode: accountCode,

		/**
		 * save the details of this gift being given
		 */
		saveGiftDetails: function () {

			// Makes connection asynchronously.  Mongoose will queue up database
			// operations and release them when the connection is complete.
			var db = mongoose.createConnection(self.uristring, function (err, res) {
				if (err) {
					console.log('ERROR connecting to: ' + self.uristring + '. ' + err);
				} else {
					console.log('Succeeded connected to: ' + self.uristring);
				}
			});

			var subscriptionSchema = new mongoose.Schema({
				age: {type: Number, min: 0},
				planCode: String,
				planName: String,
				number: Number,
				month: String,
				year: String,
				cvv: String,
				firstName: String,
				lastName: String,
				email: String,
				couponCode: String,
				unitAmountInCents: Number,
				country: String,
				startsAt: String,
				isGift: {type: Number, min: 0, max: 1},
				giftFirstName: String,
				giftLastName: String,
				giftEmail: String,
				recurlyToken: String,
				accountCode: String
			});
			console.log(self.subscription);
			var SubscriptionModel = db.model('Subscriptions', subscriptionSchema);
			// Creating one subscription.
			var newSubscription= new SubscriptionModel({
				planCode: self.subscription['plan-code'],
				planName: self.subscription['plan-name'],
				number: self.subscription['number'],
				month: self.subscription['month'],
				year: self.subscription['year'],
				cvv: self.subscription['cvv'],
				firstName: self.subscription['first_name'],
				lastName: self.subscription['last_name'],
				email: self.subscription['email'],
				couponCode: self.subscription['coupon_code'],
				unitAmountInCents: self.subscription['unit-amount-in-cents'],
				country: self.subscription['country'],
				startsAt: self.subscription['starts_at'],
				isGift: self.subscription['is_gift'],
				giftFirstName: self.subscription['gift_first_name'],
				giftLastName: self.subscription['gift_last_name'],
				giftEmail: self.subscription['gift_email'],
				recurlyToken: self.subscription['recurly-token'],
				accountCode: self.accountCode
			});

			// Saving it to the database.
			newSubscription.save(function (err) {

				if (err) {
					console.log('*** error saving record in MongoLab - message ***');
					console.log(err);
					console.log('*** end error saving record in MongoLab - message ***');
				} else {
					console.log('*** it was saved!!! ***');
				}

			});
		}

	}

	return self;

};

module.exports = MongooseClient