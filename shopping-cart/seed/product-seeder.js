var Product = require('../models/product');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopping', {useNewUrlParser: true } );

var products = [
	new Product({
	imagePath: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/f0890124934749.5633c827ed6cc.jpg',
	title: 'Batman',
	description: 'Minimalistic Poster of the Batman',
	price: 10
	}),
	new Product({
	imagePath: 'https://images-na.ssl-images-amazon.com/images/I/91KFnHJZZzL._SX425_.jpg',
	title: 'Game of Thrones S1-7 (DVD)',
	description: "A Song of Ice and Fire is brought to the screen as HBO sinks its considerable storytelling teeth into the medieval fantasy epic. It's the depiction of two powerful families -- kings and queens, knights and renegades, liars and honest men -- playing a deadly game for control of the Seven Kingdoms of Westeros",
	price: 99

	}),

	new Product({
	imagePath: 'https://images-na.ssl-images-amazon.com/images/I/81MJ1XOlHvL._SX385_.jpg',
	title: 'Bohemian Rhapsody (Blu-Ray Steelbook)',
	description: 'The Blu-ray rip of the Bohemian Rhapsody - Rami Malek - Oscar Winner Lead Actor',
	price: 38
	}),

	new Product({
	imagePath: 'https://images-na.ssl-images-amazon.com/images/I/71g93glCBUL._SL1500_.jpg',
	title: 'Sony Noise Cancelling Headphones WH1000XM3',
	description: 'Wireless Bluetooth Over the Ear Headphones with Mic and Alexa voice control - Industry Leading Active Noise Cancellation - Black',
	price: 348
	})
];

var done = 0;
for(var i =0; i<products.length; i++){
	products[i].save(function(err,result){
		done++;
		if (done == products.length){
			exit();
		}
	});
}

function exit(){
	mongoose.disconnect();
}
