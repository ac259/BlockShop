var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

var MongoClient = require('mongodb').MongoClient;
var Product = require('../models/product');
var Order = require('../models/order');
var assert = require('assert');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: true });
mongoose.connect('mongodb://localhost:27017/shopping', {useNewUrlParser: true } );
var url = 'mongodb://localhost:27017';
/* GET home page. */

router.get('/', function(req, res, next) {
  var successMsg = req.flash('success')[0];
  Product.find(function(err, docs) {
  	var productChunks = [];
  	var chunkSize = 3;
  	for ( var i=0;i< docs.length; i += chunkSize){
  		productChunks.push(docs.slice(i, i + chunkSize));
  	}
  	res.render('shop/index', { title: 'BlockShop', products: productChunks, successMsg: successMsg, noMessages: !successMsg});
	});
});


router.get('/add-to-cart/:id', function(req, res, next){
	var productId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	// this is basically passing n already existing cart if present
	// or passing an empty javascript object.

	Product.findById(productId, function(err, product){
		if(err){
			return res.redirect('/');
		}
		cart.add(product, product.id);
		req.session.cart = cart;
		console.log(req.session.cart);
		res.redirect('/');
	});
});

router.get('/reduce/:id', function(req, res, next){
	var productId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});

	cart.reduceByOne(productId);
	req.session.cart = cart;
	res.redirect('/shopping-cart');
});


router.get('/remove/:id', function(req, res, next){
	var productId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});

	cart.removeItem	(productId);
	req.session.cart = cart;
	res.redirect('/shopping-cart');
});

router.get('/shopping-cart', function(req, res,next){
	if(!req.session.cart){
		return res.render('shop/shopping-cart', {products : null});
	}
	var cart = new Cart(req.session.cart);
	res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', isLoggedIn, function(req, res, next){
	if(!req.session.cart){
		return res.redirect('/shopping-cart');
	}
	var cart = new Cart(req.session.cart);
	res.render('shop/checkout',{total: cart.totalPrice});


});

// post request - on checkout will save it to order
router.post('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    
   	var order = new Order({
   		// passport helps access user through request
   		user: req.user,
   		cart: cart
   	});
   	order.save(function(err, result){
   		req.flash('success', 'Successfully bought product!'); 
    	req.session.cart = null;
    	res.redirect('/');

   	});

});

// selling product!
router.get('/sell-item', isLoggedIn, function(req, res, next){
	//var product = new Product;

	console.log("get request");
  	res.render('shop/sell-item');
	});
/*>>>>>>> af2449278a1095b780500d251fc97c683d06344a
*/


router.post('/sell-item/post', urlEncodedParser , function(req, res, next){
	console.log(req.body);
	req.flash('success', 'Successfully posted product!');
	var new_product = {
		title: req.body.Title,
		description: req.body.Description,
		price: req.body.Price,
		imagePath : req.body.imagePath
	};

	MongoClient.connect(url,function (err, client) {
  if (err) throw err;
console.log(req.body.title);
  var db = client.db('shopping');

 db.collection('products').insertOne(new_product, function(err, result){
			assert.equal(null, err);
			console.log('New Product Inserted');

			client.close();
		})
}); 

// >>>>>>> af2449278a1095b780500d251fc97c683d06344a
	res.redirect('/')
} );


module.exports = router;

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.session.oldUrl = req.url;
	res.redirect('/user/signin');
}
