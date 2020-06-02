var express = require('express');
var router = express.Router();


function adminonly(req,res,next){ 
	if (!req.session.isadmin) 
		{return res.redirect('customer/login');}
    next();
}

/* GET report page. */
// http://localhost:3002/report
router.get('/', adminonly, function(req, res, next) {
  res.render('report/reportmenu');
});


// Method - All Customers
// ==================================================
// Route to list all records. Display view to list all records
// http://localhost:3002/report/allcustomers 
// ==================================================
router.get('/allcustomers', adminonly, function(req, res, next) {

let query = "SELECT customer_id, firstname, lastname, city, state FROM customer"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('report/allcustomers', {allrecs: result });
 	});
});



// Method - All Products / Products / Services
// ==================================================
// Route to list all records. Display view to list all records
// http://localhost:3002/report/allproducts
// ==================================================
router.get('/allproducts', adminonly, function(req, res, next) {

  let query = "SELECT product_id, productname, homepage, productimage, productstatus, saleprice, startingcity, destinationcity FROM product"; 

	// execute query
			db.query(query, (err, result) => {
				if (err) {
					console.log(err);
					res.render('error');
					}
				res.render('report/allproducts', {allrecs: result });
			}); 

});


// Method - All Sales
// ==================================================
// Route to list all records. Display view to list all records
// http://localhost:3002/report/allsales
// ==================================================
router.get('/allsales', adminonly, function(req, res, next) {

let query = "SELECT order_id, customer_id, saledate, customernotes, paymentstatus FROM saleorder"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('report/allsales', {allrecs: result });
 	});
});


module.exports = router;
