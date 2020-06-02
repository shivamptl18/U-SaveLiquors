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
	res.render('subscription/addrec');
});

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================

router.get('/', adminonly, function(req, res, next) {
let query = "SELECT subscription_id, customer_id, category_id, subscribedate, unsubscribedate FROM subscription"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('subscription/allrecords', {allrecs: result });
 	});
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid', adminonly, function(req, res, next) {
    let query = "SELECT subscription_id, customer_id, category_id, subscribedate, unsubscribedate FROM subscription WHERE subscription_id = " + req.params.recordid; 
    
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('subscription/onerec', {onerec: result[0] });
        } 
    });
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', adminonly, function(req, res, next) {

    let insertquery = "INSERT INTO subscription (customer_id, category_id, subscribedate, unsubscribedate) VALUES (?, ?, ?, ?)"; 
    
    db.query(insertquery,[req.body.customer_id, req.body.category_id, req.body.subscribedate, req.body.unsubscribedate],(err, result) => {
        if (err) {
                console.log(err);
                res.render('error');
                } else {
                res.redirect('/subscription');
                }
            });
    });


// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', adminonly, function(req, res, next) {
    let query = "SELECT subscription_id, customer_id, category_id, subscribedate, unsubscribedate FROM subscription WHERE subscription_id = " + req.params.recordid;  
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.render('subscription/editrec', {rec: result[0] });
            } 
         });
    });
    

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', adminonly, function(req, res, next) {
	let updatequery = "UPDATE subscription SET customer_id = ?, category_id = ?, subscribedate = ?, unsubscribedate = ? WHERE subscription_id = " + req.body.subscription_id; 


	db.query(updatequery,[req.body.subscription_id, req.body.customer_id, req.body.category_id, req.body.subscribedate, req.body.unsubscribedate],(err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/subscription');
		}
		});
});


// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', adminonly, function(req, res, next) {
    let query = "DELETE FROM subscription WHERE subscription_id = " + req.params.recordid;  
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/subscription');
            } 
         });
    });
    
    




module.exports = router;
