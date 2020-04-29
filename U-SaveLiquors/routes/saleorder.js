var express = require('express');
var router = express.Router();

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
	res.render('saleorder/addrec');
});

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================

router.get('/', function(req, res, next) {
let query = "SELECT order_id, customer_id, saledate, customernotes, paymentstatus FROM saleorder"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('saleorder/allrecords', {allrecs: result });
 	});
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid', function(req, res, next) {
    let query = "SELECT order_id, customer_id, saledate, customernotes, paymentstatus FROM saleorder WHERE order_id = " + req.params.recordid; 
    
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('saleorder/onerec', {onerec: result[0] });
        } 
    });
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

    let insertquery = "INSERT INTO saleorder (customer_id, saledate, customernotes, paymentstatus) VALUES (?, ?, ?, ?)"; 
    
    db.query(insertquery,[req.body.customer_id, req.body.saledate, req.body.customernotes, req.body.paymentstatus],(err, result) => {
        if (err) {
                console.log(err);
                res.render('error');
                } else {
                res.redirect('/saleorder');
                }
            });
    });


// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT order_id, customer_id, saledate, customernotes, paymentstatus FROM saleorder WHERE order_id = " + req.params.recordid;  
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.render('saleorder/editrec', {rec: result[0] });
            } 
         });
    });
    

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
	let updatequery = "UPDATE saleorder SET customer_id = ?, saledate = ?, customernotes = ?, paymentstatus = ? WHERE order_id = " + req.body.order_id; 


	db.query(updatequery,[req.body.order_id, req.body.product_id, req.body.saleprice, req.body.qty],(err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/saleorder');
		}
		});
});


// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM saleorder WHERE order_id = " + req.params.recordid;  
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/saleorder');
            } 
         });
    });
    
    




module.exports = router;