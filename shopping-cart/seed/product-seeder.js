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
	description: "A Song of Ice and Fire is brought to the screen as HBO sinks its considerable storytelling teeth into the medieval fantasy epic.",
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
	}),

	new Product({
	imagePath: 'https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140,2000%7C51djlOws4OL.png%7C0,0,2140,2000+0.0,0.0,2140.0,2000.0._UX679_.png',
	title: 'Blockchain T-Shirt',
	description: 'blockchain t-shirt for crypto fans',
	price: 15
	}),

	new Product({
	imagePath: 'https://images-na.ssl-images-amazon.com/images/I/51X3VeaAZnL._SX379_BO1,204,203,200_.jpg',
	title: 'Mastering Ethereum',
	description: 'Building Smart Contracts and DApps 1st Edition',
	price: 48
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
