var express = require('express');
var router = express.Router();

// ==================================================
// Route to display search
// ==================================================
router.get('/', function(req, res, next) {
	let query = "SELECT product_id, productname, productimage, item_description, productstatus, saleprice, startingcity, destinationcity, productduration FROM product WHERE item_description LIKE '%" + req.body.searchcriteria + "%'";   
	
	// execute query
	db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.render('search', {allrecs: result});
		} 
	});
});



// ==================================================
// Route to display search
// ==================================================
router.post('/', function(req, res, next) {

	let query = "SELECT product_id, productname, productimage, item_description, productstatus, saleprice, startingcity, destinationcity, productduration FROM product WHERE item_description LIKE '%" + req.body.searchcriteria + "%'";   
	
	// execute query
	db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.render('search', {allrecs: result});
		} 
	});
});

module.exports = router;
