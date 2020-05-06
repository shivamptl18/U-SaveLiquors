var express = require('express');
var router = express.Router();

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
	res.render('supplier/addrec');
});

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================

router.get('/', function(req, res, next) {
let query = "SELECT supplier_id, companyname, pointofcontact, website, phone FROM supplier"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('supplier/allrecords', {allrecs: result });
 	});
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid', function(req, res, next) {
    let query = "SELECT supplier_id, companyname, pointofcontact, website, phone FROM supplier WHERE supplier_id = " + req.params.recordid; 
    
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('supplier/onerec', {onerec: result[0] });
        } 
    });
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

    let insertquery = "INSERT INTO supplier (companyname, pointofcontact, website, phone) VALUES (?, ?, ?, ?)"; 
    
    db.query(insertquery,[req.body.companyname, req.body.pointofcontact, req.body.website, req.body.phone],(err, result) => {
        if (err) {
                console.log(err);
                res.render('error');
                } else {
                res.redirect('/supplier');
                }
            });
    });


// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT supplier_id, companyname, pointofcontact, website, phone FROM supplier WHERE supplier_id = " + req.params.recordid;  
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.render('supplier/editrec', {rec: result[0] });
            } 
         });
    });
    

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
	let updatequery = "UPDATE supplier SET companyname = ?, pointofcontact = ?, website = ?, phone = ? WHERE supplier_id = " + req.body.suppier_id; 


	db.query(updatequery,[req.body.companyname, req.body.pointofcontact, req.body.website, req.body.phone],(err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/supplier');
		}
		});
});


// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM supplier WHERE supplier_id = " + req.params.recordid;  
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/supplier');
            } 
         });
    });
    
    




module.exports = router;
