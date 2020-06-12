var express = require('express');
var router = express.Router();

function adminonly(req,res,next){ 
	if (!req.session.isadmin) 
		{return res.redirect('customer/login');}
    next();
}



// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', adminonly, function(req, res, next) {
    let query = "SELECT category_id, categoryname FROM category"; 
	// execute query
	db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
		res.render('product/addrec', {category: result});
 	});
});



// ==================================================
// Route to list all records. Display view to list all records
// ==================================================

router.get('/', adminonly, function(req, res, next) {
let query = "SELECT product_id, productname, homepage, productimage, productstatus, saleprice, startingcity, destinationcity FROM product"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('product/allrecords', {allrecs: result });
 	});
});


// ==================================================
// Route to view one specific record. Notice the view is one record
// Customer view
// URL: http://localhost:3002/package/10/view
// ==================================================
router.get('/:recordid/view', function(req, res, next) {

	let query = "SELECT product_id, productname, homepage, productimage, item_description, category_id, supplier_id, subcategory_1, subcategory_2,productstatus, saleprice, startingcity, destinationcity, productduration FROM product WHERE product_id = " + req.params.recordid; 

	// execute query
	db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
	
			let query = "SELECT review_id, customer_id, product_id, reviewdate, comments, rating, productstatus FROM review WHERE product_id = " + req.params.recordid; 

			// execute query
			db.query(query, (err, reviews) => {
				if (err) {
					console.log(err);
					res.render('error');
				} else {
				res.render('product/detview', {onerec: result[0], reviews: reviews });
				} 
			});
		} 
	});
});




// ==================================================
// Route to view one specific record. Notice the view is one record
// Administrator View
// ==================================================
router.get('/:recordid', adminonly, function(req, res, next) {
    let query = "SELECT product_id, productname, homepage, productimage, item_description, category_id, supplier_id, subcategory_1, subcategory_2, productstatus, saleprice, startingcity, destinationcity, productduration FROM product WHERE product_id = " + req.params.recordid; 
    
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('product/onerec', {onerec: result[0] });
        } 
    });
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', adminonly, function(req, res, next) {

    let insertquery = "INSERT INTO product (productname, productimage, item_description, category_id, supplier_id, subcategory_1, subcategory_2, productstatus, saleprice, startingcity, destinationcity, productduration, homepage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)"; 

    var homepagechecked = false;
    if (req.body.homepage) {
        homepagechecked = true;
    } else {
        homepagechecked = false;
    }

    
    db.query(insertquery,[req.body.productname, req.body.productimage, req.body.item_description, req.body.category_id, req.body.supplier_id, req.body.subcategory_1, req.body.subcategory_2, req.body.productstatus, req.body.saleprice, req.body.startingcity, req.body.destinationcity, req.body.productduration, homepagechecked],(err, result) => {
        if (err) {
                console.log(err);
                res.render('error');
                } else {
                res.redirect('/product');
                }
            });
    });


// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', adminonly, function(req, res, next) {
    let query = "SELECT product_id, productname, homepage, productimage, item_description, category_id, supplier_id, subcategory_1, subcategory_2, productstatus, saleprice, startingcity, destinationcity, productduration FROM product WHERE product_id = " + req.params.recordid;  
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
         
			let query = "SELECT category_id, categoryname FROM category"; 
			// execute query
			db.query(query, (err, cats) => {
				if (err) {
					console.log(err);
					res.render('error');
				}
				res.render('product/editrec', {rec: result[0], category: cats});
			});
		} 
 	});
});


// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', adminonly, function(req, res, next) {
    let updatequery = "UPDATE product SET productname = ?, productimage = ?, item_description = ?, category_id = ?, supplier_id = ?, subcategory_1 = ?, subcategory_2 = ?, productstatus = ?, saleprice = ?, startingcity = ?, destinationcity = ?, productduration = ?, homepage = ? WHERE product_id = " + req.body.product_id; 
    
    var homepagechecked = false;
    if (req.body.homepage) {
        homepagechecked = true;
    } else {
        homepagechecked = false;
    }



	db.query(updatequery,[req.body.productname, req.body.productimage, req.body.item_description, req.body.category_id, req.body.supplier_id, req.body.subcategory_1, req.body.subcategory_2, req.body.productstatus, req.body.saleprice, req.body.startingcity, req.body.destinationcity, req.body.productduration, homepagechecked],(err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/product');
		}
		});
});


// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', adminonly, function(req, res, next) {
    let query = "DELETE FROM product WHERE product_id = " + req.params.recordid;  
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/product');
            } 
         });
    });
    
    




module.exports = router;
