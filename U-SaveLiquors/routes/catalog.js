var express = require('express');
var router = express.Router();

/* GET catalog page. */
router.get('/', function(req, res, next) {
	
  let query = "SELECT product_id, productname, homepage, productimage, productstatus, saleprice, startingcity, destinationcity FROM product"; 

	// execute query
			db.query(query, (err, result) => {
				if (err) {
					console.log(err);
					res.render('error');
					}
					res.render('catalog', {allrecs: result});
			});
});


// ==================================================
// Route to add an item to the cart
//    URL: http://localhost:3002/catalog/10/add
// ==================================================
router.get('/:pkgid/add', function(req, res, next) {
   cart.push(req.params.pkgid);
   res.render('cart');
});


// ==================================================
// Route to add an item to the cart
//	URL: http://localhost:3002/2/remove
// ==================================================
router.get('/:itemid/remove', function(req, res, next) {
   cart.splice(req.params.itemid,1);
   res.render('cart');
});



// ==================================================
// Route to show shopping cart
//  URL: http://localhost:3002/catalog/cart
// ==================================================
router.get('/cart', function(req, res, next) {
   res.render('cart');
});





module.exports = router;
