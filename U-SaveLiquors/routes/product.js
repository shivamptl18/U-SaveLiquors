var express = require('express');
var router = express.Router();

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
	res.render('product/addrec');
});

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================

router.get('/', function(req, res, next) {
let query = "SELECT product_id, productname, productimage, productstatus, saleprice, startingcity, destinationcity FROM product"; 

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
// ==================================================
router.get('/:recordid', function(req, res, next) {
    let query = "SELECT product_id, productname, productimage, item_description, category_id, supplier_id, subcategory_1, subcategory_2, productstatus, saleprice, startingcity, destinationcity, productduration FROM product WHERE product_id = " + req.params.recordid; 
    
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
router.post('/', function(req, res, next) {

    let insertquery = "INSERT INTO product (productname, productimage, item_description, category_id, supplier_id, subcategory_1, subcategory_2, productstatus, saleprice, startingcity, destinationcity, productduration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"; 
    
    db.query(insertquery,[req.body.productname, req.body.productimage, req.body.item_description, req.body.category_id, req.body.supplier_id, req.body.subcategory_1, req.body.subcategory_2, req.body.productstatus, req.body.saleprice, req.body.startingcity, req.body.destinationcity, req.body.productduration],(err, result) => {
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
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT product_id, productname, productimage, item_description, category_id, supplier_id, subcategory_1, subcategory_2, productstatus, saleprice, startingcity, destinationcity, productduration FROM product WHERE product_id = " + req.params.recordid;  
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.render('product/editrec', {rec: result[0] });
            } 
         });
    });
    

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
	let updatequery = "UPDATE product SET productname = ?, productimage = ?, item_description = ?, category_id = ?, supplier_id = ?, subcategory_1 = ?, subcategory_2 = ?, productstatus = ?, saleprice = ?, startingcity = ?, destinationcity = ?, productduration = ? WHERE product_id = " + req.body.product_id; 


	db.query(updatequery,[req.body.productname, req.body.productimage, req.body.item_description, req.body.category_id, req.body.supplier_id, req.body.subcategory_1, req.body.subcategory_2, req.body.productstatus, req.body.saleprice, req.body.startingcity, req.body.destinationcity, req.body.productduration],(err, result) => {
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
router.get('/:recordid/delete', function(req, res, next) {
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
