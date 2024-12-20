var express = require('express');
var bcrypt = require('bcryptjs');
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
	res.render('customer/addrec');
});

// ==================================================
// Route Enable Registration
// http://127.0.0.1:3037/customer/register
// ==================================================
router.get('/register', function(req, res, next) {
	res.render('customer/addrec');
});

// ==================================================
// Route Provide Login Window
// http://127.0.0.1:3037/customer/login
// ==================================================
router.get('/login', function(req, res, next) {
	res.render('customer/login', {message: "Please Login"});
});


// ==================================================
// Route Check Login Credentials
// ==================================================
router.post('/login', function(req, res, next) {
	let query = "select customer_id, firstname, lastname, password, isadmin from customer WHERE username = '" + req.body.username + "'"; 
	  
	// execute query
	db.query(query, (err, result) => {
		  if (err) {res.render('error');} 
		  else {
			  if(result[0])
				  {
				  // Username was correct. Check if password is correct
				  bcrypt.compare(req.body.password, result[0].password, function(err, result1) {
					  if(result1) {
						  
						  var isadmin = result[0].isadmin;
						  if (isadmin){
							  req.session.isadmin = true;
						  }
						  else {
							  req.session.isadmin = false;
						  }
						  
						  
						  
						  // Password is correct. Set session variables for user.
						  var custid = result[0].customer_id;
						  req.session.customer_id = custid;
						  var custname = result[0].firstname + " "+ result[0].lastname;
						  req.session.custname = custname;
						  res.redirect('/');
					  } else {
						  // password do not match
						  res.render('customer/login', {message: "Wrong Password"});
					  }
				  });
				  }
			  else {
				  res.render('customer/login', {message: "Wrong Username"});
				  }
		  } 
	   });
  });

// ==================================================
// Route to logout
// ==================================================
router.get('/logout', function(req, res, next) {
	req.session.customer_id = 0;
	req.session.custname = "";
	req.session.isadmin = false;
	res.redirect('/');
});



// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get('/', adminonly, function(req, res, next) {

let query = "SELECT customer_id, firstname, lastname, city, state, isadmin FROM customer"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('customer/allrecords', {allrecs: result });
 	});
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid', adminonly, function(req, res, next) {

	let query = "SELECT customer_id, firstname, lastname, email, phone, address1, address2, city, state, zip, addlnotes, username, password, isadmin FROM customer WHERE customer_id = " + req.params.recordid; 

	// execute query
	db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.render('customer/onerec', {onerec: result[0] });
		} 
	});
});


// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

	let insertquery = "INSERT INTO customer (firstname, lastname, email, phone, address1, address2, city, state, zip, addlnotes, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"; 

	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(req.body.password, salt, (err, hash) => {
			if(err) 
				{ res.render('error');}

			db.query(insertquery,[req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.address1, req.body.address2, req.body.city, req.body.state, req.body.zip, req.body.addlnotes, req.body.username, hash],(err, result) => {
				if (err) {
					console.log(err);
					res.render('error');
				} else {
				res.redirect('/');
				}
			
			});
		});
	
	});
});


// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', adminonly, function(req, res, next) {
	let query = "SELECT customer_id, firstname, lastname, email, phone, address1, address2, city, state, zip, addlnotes, username, password, isadmin FROM customer WHERE customer_id = " + req.params.recordid;  

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.render('customer/editrec', {rec: result[0] });
		} 
 	});
});

// ==================================================
// Route to edit one specific record.
// Update User Profile
// ==================================================
router.get('/:recordid/change',  function(req, res, next) {
	let query = "SELECT customer_id, firstname, lastname, email, phone, address1, address2, city, state, zip, addlnotes, username, password, isadmin FROM customer WHERE customer_id = " + req.params.recordid;  

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.render('customer/changerec', {rec: result[0] });
		} 
 	});
});


// ==================================================
// Route to save edited data in database.
// chgsave update user profile
// ==================================================
router.post('/chgsave', function(req, res, next) {
	
	let updatequery = "UPDATE customer SET firstname = ?, lastname = ?, email = ?, phone = ?, address1 = ?, address2 = ?, city = ?, state = ?, zip = ?  WHERE customer_id = " + req.body.customer_id; 

	db.query(updatequery,[req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.address1, req.body.address2, req.body.city, req.body.state, req.body.zip],(err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/');
		}
		});
});


// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', adminonly, function(req, res, next) {
	
	let updatequery = "UPDATE customer SET firstname = ?, lastname = ?, email = ?, phone = ?, address1 = ?, address2 = ?, city = ?, state = ?, zip = ?, addlnotes = ?, username = ?, password = ?, isadmin = ? WHERE customer_id = " + req.body.customer_id; 

	var isadminchecked = false;
    if (req.body.isadmin) {
        isadminchecked = true;
    } else {
        isadminchecked = false;
    }


	db.query(updatequery,[req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.address1, req.body.address2, req.body.city, req.body.state, req.body.zip, req.body.addlnotes, req.body.username, req.body.password, isadminchecked],(err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/customer');
		}
		});
});

// ==================================================
// Route to delete one specific record.  
// ==================================================
router.get('/:recordid/delete', adminonly, function(req, res, next) {
	let query = "DELETE FROM customer WHERE customer_id = " + req.params.recordid;  

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/customer');
		} 
 	});
});


module.exports = router;
