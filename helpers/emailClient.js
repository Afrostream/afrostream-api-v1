var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

function EmailClient (subscriptionRequest, invoiceNumber) {

	var self = {

		subscription : subscriptionRequest,

		invoice: invoiceNumber,

		sendStandardEmail : function() {

			var options = {
				auth: {
					api_user: 'azure_3e7c4f32e08f4c0ba3c3ec8eb6c2fe58@azure.com',
					api_key: 'Afr@stream77'
				}
			}

			var client = nodemailer.createTransport(sgTransport(options));

			var email = {
				from: 'abonnement@afrostream.tv',
				to: self.subscription['email'],
				bcc: ['abonnement@afrostream.tv'],
				subject: 'Confirmation d\'abonnement : Bienvenue dans la famille AFROSTREAM, '
				+ self.subscription['first_name'],

				text: 'Bonjour ' + self.subscription['first_name'] + ', \n\n' +
				'Je  suis heureux de te compter parmi nous ! Dès le 1er septembre '
				+ '(le 1er octobre pour les abonnés "Think Like a Man"), tu pourras profiter '
				+ 'des films et séries afro en illimité.\n\n'
				+ 'Tu recevras des informations d\'identifications le 1er septembre.\n\n'
				+ 'Pour satisfaire au mieux tes attentes, peux tu répondre à 6 questions (30 sec.) '
				+ 'en cliquant ici: https://docs.google.com/a/afrostream.tv/forms/d/1KyfN8Ng25UZ8KZtNCAr3DPC-ldNwpESDNEig4UQ9LpQ/viewform \n\n'
				+ 'Mais si tu le préfères, je peux t’appeler cette semaine pour quelques questions.\n\n'
				+ 'À très vite,\n\n'
				+ 'Tonjé BAKANG\n\n'
				+ 'Fondateur d\'AFROSTREAM'
			};

			client.sendMail(email, function(err, info){
				if (err ){
					console.log('*** error sending standard email - message ***');
					console.log(err);
					console.log('*** end of error sending standard email - message ***');
				}
				else {
					console.log('Message sent: ' + info);
				}
			});

		},

		sendReceiverEmail : function() {

			var options = {
				auth: {
					api_user: 'azure_3e7c4f32e08f4c0ba3c3ec8eb6c2fe58@azure.com',
					api_key: 'Afr@stream77'
				}
			}

			var client = nodemailer.createTransport(sgTransport(options));

			var email = {
				from: 'abonnement@afrostream.tv',
				to: self.subscription['gift_email'],
				bcc: ['abonnement@afrostream.tv'],
				subject: 'Vous êtes maintenant abonné à Afrostream grâce à '
				+ self.subscription['first_name'] + ' ' + self.subscription['last_name'],

				text: 'Bonjour ' +  self.subscription['gift_first_name'] + ' ' + self.subscription['gift_last_name'] + ',\n\n'
				+ self.subscription['first_name'] + ' ' + self.subscription['last_name']
				+ ' vient de t\'offrir 1 an de film et séries Afro en illimité sur AFROSTREAM.\n\n'
				+ 'Je suis heureux de te compter parmi nous ! Dès le 1er septembre, tu auras accès à '
				+'l\'offre d\'Afrostream sur https://afrostream.tv \n\n'
				+ 'Tu recevras tes informations d\'identification le 1er septembre, \n\n'
				+ 'Bienvenue dans la famille ! \n\n'
				+ 'Tonjé Bakang, \n\nFondateur d\'Afrostream'

			};

			client.sendMail(email, function(err, info){
				if (err ){
					console.log('*** error sending receiver email - message ***');
					console.log(err);
					console.log('*** end of error receiver sending email - message ***');
				}
				else {
					console.log('Message sent: ' + info);
				}
			});

		},

		sendGiverEmail : function() {

			var options = {
				auth: {
					api_user: 'azure_3e7c4f32e08f4c0ba3c3ec8eb6c2fe58@azure.com',
					api_key: 'Afr@stream77'
				}
			}

			var client = nodemailer.createTransport(sgTransport(options));

			var email = {
				from: 'cadeau@afrostream.tv',
				to: self.subscription['email'],
				bcc: ['abonnement@afrostream.tv'],
				subject: 'Confirmation de votre cadeau à ' + self.subscription['gift_first_name']
				+ ' ' + self.subscription['gift_last_name'],

				text: 'Salut ' + self.subscription['first_name'] + ' ' + self.subscription['last_name'] + ', \n\n' +
				'Grâce à toi, '+ self.subscription['gift_first_name'] + ' ' + self.subscription['gift_last_name']
				+ ' est maintenant abonné(e) à Afrostream et va profiter d\'un an de séries et films Afro en illimité.\n\n'
				+ self.subscription['gift_first_name'] + ' ' + self.subscription['gift_last_name']
				+ ' recevra ses informations d\'identification dès le 1 septembre par email.\n\n'
				+ 'N\'hésite pas à lui envoyer un message pour vérifier que notre email n\'est pas dans ses spams.\n\n'
				+ 'À bientôt\n\n'
				+ 'Tonjé Bakang, \n\nFondateur d\'Afrostream\n\n\n'
				+ '-----------------------------------\n\n'
				+ 'Votre sélection : Formule Ambassadeurs\n\n'
				+ 'Commande n° ' + self.invoice + '\n\n'
				+ 'Sous-total:  €59.99\n\n'
				+ 'Payé:      €59.99\n\n'
				+ 'Valable jusqu\'au 1er septembre 2016\n\n\n'
				+ 'Facturé à :\n\n'
				+ self.subscription['first_name'] + ' ' + (self.subscription['last_name']).toUpperCase() + '\n\n'
				+ '-----------------------------------\n\n'
			};

			client.sendMail(email, function(err, info){
				if (err ){
					console.log('*** error sending giver email - message ***');
					console.log(err);
					console.log('*** end of error sending giver email - message ***');;
				}
				else {
					console.log('Message sent: ' + info);
				}
			});

		}

	}

	return self;

};

module.exports = EmailClient