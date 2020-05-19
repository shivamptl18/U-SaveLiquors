var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  let query = "SELECT product_id, productname, homepage, productimage, productstatus, saleprice, startingcity, destinationcity FROM product WHERE homepage = true"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}


		let query = "SELECT promotion_id, promotitle, promoimage FROM promotion WHERE startdate <= CURRENT_DATE() and enddate >= CURRENT_DATE()"; 
		// execute query
		db.query(query, (err, promos) => {
			if (err) {
				console.log(err);
				res.render('error');
				}
				res.render('index', {allrecs: result, promos: promos });
			});
	});

});
  


module.exports = router;
