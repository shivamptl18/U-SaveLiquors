/*
	Shivam Patel
	IT 231 Website Database
    April 27, 2020
	*/

-- CREATE TABLE
CREATE TABLE customer (
	customer_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	firstname VARCHAR(20) NOT NULL,
	lastname VARCHAR(20) NOT NULL,
	email VARCHAR(25) NOT NULL,
	phone VARCHAR(20) NOT NULL,
	address1 VARCHAR(50) NOT NULL,
	address2 VARCHAR(50) NULL,
	city VARCHAR(20) NOT NULL,
	state VARCHAR(50) NOT NULL,
	zip VARCHAR(10) NOT NULL,
	addlnotes VARCHAR(5000) NULL,
	username varchar(20) NOT NULL,
	password varchar(4000) NOT NULL
	);

-- Popluate table
INSERT INTO customer (firstname, lastname, email, phone, address1, address2, city, state, zip, addlnotes, username, password) VALUES ("John", "Roberts", "johnrobert@depaul.edu", "6306733146", "123 Main Street", "Suite 110", "Chicago", "IL", "60101", "John likes grass.", "jrob", "password");
INSERT INTO customer (firstname, lastname, email, phone, address1, address2, city, state, zip, addlnotes, username, password) VALUES ("Mike", "Ross", "mikeross@depaul.edu", "6303435678", "112 Doe Street", "Suite 145", "Chicago", "IL", "60101", "Mike likes car.", "mikeross", "passpass");
INSERT INTO customer (firstname, lastname, email, phone, address1, address2, city, state, zip, addlnotes, username, password) VALUES ("Matt", "King", "mking@depaul.edu", "6305457897", "1 East Street", "Suite 677", "Chicago", "IL", "60101", "Matt likes houses.", "mking", "wordword");
INSERT INTO customer (firstname, lastname, email, phone, address1, address2, city, state, zip, addlnotes, username, password) VALUES ("Jim", "Mcnullty", "jimmcnullty@depaul.edu", "7735467690", "177 Westwood Street", "Suite 800", "Chicago", "IL", "60101", "Jim likes trees.", "jmky", "wordpass");
INSERT INTO customer (firstname, lastname, email, phone, address1, address2, city, state, zip, addlnotes, username, password) VALUES ("Lebron", "James", "lebronjames@depaul.edu", "6302302424", "123 Laker Steet", "Suite 23", "Chicago", "IL", "60101", "Lebron likes milk.", "lbj", "mvp2020");
 



-- CREATE TABLE
CREATE TABLE supplier (
	supplier_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	companyname VARCHAR(50) NOT NULL,
	pointofcontact VARCHAR(50) NOT NULL,
	website VARCHAR(50) NOT NULL,
	phone VARCHAR(20) NOT NULL
	);

-- Popluate table
INSERT INTO supplier(companyname, pointofcontact, website, phone) values ("Breakthru", "John Smith", "www.breakthru.com", "1234567890");
INSERT INTO supplier(companyname, pointofcontact, website, phone) values ("Southern", "Bobby Jones", "www.southern.com", "1247568658");
INSERT INTO supplier(companyname, pointofcontact, website, phone) values ("Holiday", "Mike Flenn", "www.Holiday.com", "4537658976");
INSERT INTO supplier(companyname, pointofcontact, website, phone) values ("Pepsi", "Randy Smith", "www.pepsi.com", "978945643535");
INSERT INTO supplier(companyname, pointofcontact, website, phone) values ("Fritos", "Bill Nelson", "www.fritolay.com", "4534531238");

-- CREATE TABLE
CREATE TABLE category (
	category_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	categoryname VARCHAR(50) NOT NULL,
	item_description VARCHAR(250) NOT NULL
	);


-- Popluate table
INSERT INTO category(categoryname, item_description) values ("Beer", "Local and imported Beer");
INSERT INTO category(categoryname, item_description) values ("Wine", "Fine Wine");
INSERT INTO category(categoryname, item_description) values ("Liquor", "Wide range of Liquors");
INSERT INTO category(categoryname, item_description) values ("Cigrettes", "Variety of Cigrettes");
INSERT INTO category(categoryname, item_description) values ("Cigars", "Many kinds of Cigars");


-- CREATE TABLE
CREATE TABLE product (
	product_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	productname VARCHAR(50) NOT NULL,
	productimage VARCHAR(50) NOT NULL,
	item_description VARCHAR(500) NOT NULL,
	category_id INT NOT NULL,
	supplier_id INT NOT NULL,
	subcategory_1 VARCHAR(20) NULL,
	subcategory_2 VARCHAR(20) NULL,
	productstatus VARCHAR(20) NOT NULL,
	saleprice DECIMAL(8,2) NOT NULL,
	startingcity VARCHAR(30) NOT NULL,
	destinationcity VARCHAR(30) NOT NULL,
	productduration VARCHAR(30) NOT NULL,
	FOREIGN KEY (supplier_id) REFERENCES supplier(supplier_id) ON DELETE CASCADE ON UPDATE RESTRICT,
	FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE ON UPDATE RESTRICT
	);


-- Popluate table
INSERT INTO product (productname, productimage, item_description, category_id, supplier_id, subcategory_1, subcategory_2, productstatus, saleprice, startingcity, destinationcity, productduration) VALUES ("Miller Lite", "millerlite.png", "Miller is one of the famous products.", 1, 1, "Beer", "Natural", "In Stock", 8.99, "Rockford, Alaska", "Anchorage, Alaska", "90 Days");
INSERT INTO product (productname, productimage, item_description, category_id, supplier_id, subcategory_1, subcategory_2, productstatus, saleprice, startingcity, destinationcity, productduration) VALUES ("Budwiser", "budwiser.png", "Budwiser is one of the famous products.", 2, 2, "Beer", "Natural", "In Stock", 8.99, "Elgin, Alaska", "Anchorage, Illinois", "90 Days");
INSERT INTO product (productname, productimage, item_description, category_id, supplier_id, subcategory_1, subcategory_2, productstatus, saleprice, startingcity, destinationcity, productduration) VALUES ("Goose Island", "gooseisland.png", "Goose Island is one of the famous products.", 3, 3, "IPA", "Natural", "In Stock", 10.99, "Hoffman Estates, Illinois", "Anchorage, Alaska", "90 Days");
INSERT INTO product (productname, productimage, item_description, category_id, supplier_id, subcategory_1, subcategory_2, productstatus, saleprice, startingcity, destinationcity, productduration) VALUES ("White Claw", "whiteclaw.png", "White Claw is one of the famous products.", 4, 4, "spark", "Natural", "In Stock", 10.49, "Juneau, Alaska", "Anchorage, Alaska", "90 Days");
INSERT INTO product (productname, productimage, item_description, category_id, supplier_id, subcategory_1, subcategory_2, productstatus, saleprice, startingcity, destinationcity, productduration) VALUES ("Truly", "truly.png", "Truly is one of the famous products.", 5, 5, "drink", "Natural", "In Stock", 10.49, "Juneau, Alaska", "Anchorage, Alaska", "90 Days");


-- CREATE TABLE
CREATE TABLE saleorder (
	order_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	customer_id INT NOT NULL,
	saledate DATE NOT NULL,
	customernotes  VARCHAR(500),
	paymentstatus  VARCHAR(10),
	FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE ON UPDATE RESTRICT
	);


-- Popluate table
INSERT INTO saleorder (customer_id, saledate, customernotes, paymentstatus) VALUES (1, "2020-04-16", "Great product", "Fully Paid");
INSERT INTO saleorder (customer_id, saledate, customernotes, paymentstatus) VALUES (2, "2020-08-18", "Amazing", "Fully Paid");
INSERT INTO saleorder (customer_id, saledate, customernotes, paymentstatus) VALUES (3, "2020-06-17", "love it", "Fully Paid");
INSERT INTO saleorder (customer_id, saledate, customernotes, paymentstatus) VALUES (4, "2020-05-15", "would buy again 100 times", "Fully Paid");
INSERT INTO saleorder (customer_id, saledate, customernotes, paymentstatus) VALUES (5, "2020-04-20", "outstanding", "Fully Paid");


-- CREATE TABLE
CREATE TABLE orderdetail (
	orderdetail_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	order_id INT NOT NULL,
	product_id INT NOT NULL,
	saleprice DECIMAL(8,2) NOT NULL,
	qty INT NOT NULL,
	FOREIGN KEY (order_id) REFERENCES saleorder(order_id) ON DELETE CASCADE ON UPDATE RESTRICT,
	FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE ON UPDATE RESTRICT
	);


-- Popluate table
INSERT INTO orderdetail (order_id, product_id, saleprice, qty) VALUES (1, 1, 8.99, 100);
INSERT INTO orderdetail (order_id, product_id, saleprice, qty) VALUES (2, 2, 8.99, 145);
INSERT INTO orderdetail (order_id, product_id, saleprice, qty) VALUES (3, 3, 10.99, 132);
INSERT INTO orderdetail (order_id, product_id, saleprice, qty) VALUES (4, 4, 10.49, 149);
INSERT INTO orderdetail (order_id, product_id, saleprice, qty) VALUES (5, 5, 10.49, 167);




-- CREATE TABLE
CREATE TABLE review (
	review_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	customer_id INT NOT NULL,
	product_id INT NOT NULL,
	reviewdate DATE NOT NULL,
	comments  VARCHAR(500),
	rating INT NOT NULL,
	productstatus  VARCHAR(10),
	FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE ON UPDATE RESTRICT,
	FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE ON UPDATE RESTRICT
	);



-- Popluate table
INSERT INTO review (customer_id, product_id, reviewdate, comments, rating, productstatus) VALUES (1, 1, "2020-08-23", "Product is amazing", 5, "In Stock");
INSERT INTO review (customer_id, product_id, reviewdate, comments, rating, productstatus) VALUES (2, 2, "2020-06-18", "Product is excellent", 5, "In Stock");
INSERT INTO review (customer_id, product_id, reviewdate, comments, rating, productstatus) VALUES (3, 3, "2020-04-17", "Product is great", 5, "In Stock");
INSERT INTO review (customer_id, product_id, reviewdate, comments, rating, productstatus) VALUES (4, 4, "2020-05-19", "Product is worth it", 4, "In Stock");
INSERT INTO review (customer_id, product_id, reviewdate, comments, rating, productstatus) VALUES (5, 5, "2020-06-14", "Product is worth it", 5, "In Stock");


-- CREATE TABLE
CREATE TABLE subscription (
	subscription_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	customer_id INT NOT NULL,
	category_id INT NOT NULL,
	subscribedate DATE NOT NULL,
	unsubscribedate DATE NULL,
	FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE ON UPDATE RESTRICT,
	FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE ON UPDATE RESTRICT
	);

-- Popluate table
INSERT INTO subscription (customer_id, category_id, subscribedate, unsubscribedate) VALUES (1, 1, "2020-10-16", "2020-03-16");
INSERT INTO subscription (customer_id, category_id, subscribedate, unsubscribedate) VALUES (1, 1, "2020-01-15", "2020-06-17");
INSERT INTO subscription (customer_id, category_id, subscribedate, unsubscribedate) VALUES (1, 1, "2020-04-25", "2020-10-15");
INSERT INTO subscription (customer_id, category_id, subscribedate, unsubscribedate) VALUES (1, 1, "2020-04-24", "2020-06-13");
INSERT INTO subscription (customer_id, category_id, subscribedate, unsubscribedate) VALUES (1, 1, "2020-04-13", "2020-04-15");



/*
-- CREATE TABLE
CREATE TABLE inventory (
    inventory_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    productname VARCHAR(50) NOT NULL,
    category_id INT NOT NULL,
    item_description VARCHAR(500) NOT NULL,
    qty INT NOT NULL,
    subcategory_1 VARCHAR(20) NULL,
	subcategory_2 VARCHAR(20) NULL
);


-- Popluate table
INSERT INTO inventory (product_id, productname, category_id, item_description, qty, subcategory_1, subcategory_2) VALUES (2, "Miller Lite", 1, "Miller is one of the famous products", 100, "Beer", "Natrual");
INSERT INTO inventory (product_id, productname, category_id, item_description, qty, subcategory_1, subcategory_2) VALUES (2, "Budwiser", 1, "Budwiser is one of the famous products", 145, "Beer", "Natrual");
INSERT INTO inventory (product_id, productname, category_id, item_description, qty, subcategory_1, subcategory_2) VALUES (2, "Goose Island", 1, "Goose Island is one of the famous products", 132, "IPA", "Natrual");
INSERT INTO inventory (product_id, productname, category_id, item_description, qty, subcategory_1, subcategory_2) VALUES (2, "White Claw", 1, "White Claw is one of the famous products.", 149, "spark", "Natrual");
INSERT INTO inventory (product_id, productname, category_id, item_description, qty, subcategory_1, subcategory_2) VALUES (2, "Truly", 1, "Truly is one of the famous products", 167, "drink", "Natrual");
*/


-- CREATE TABLE
CREATE TABLE promotion (
	promotion_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	promotitle VARCHAR(50) NOT NULL,
	promoimage VARCHAR(20) NOT NULL,
	item_description VARCHAR(200) NOT NULL,
	startdate DATE NOT NULL,
	enddate DATE NOT NULL,
	discountrate DECIMAL(5,2)
	);

-- Populate Table
INSERT INTO promotion (promotitle, promoimage, item_description, startdate, enddate, discountrate) VALUES ("Memorial Day Sale - 2020", "promo1.png","Promotion for memorial day sale in year 2020", "2020-05-01", "2020-06-10", 0.05);
INSERT INTO promotion (promotitle, promoimage, item_description, startdate, enddate, discountrate) VALUES ("Independence Day Sale - 2020", "promo2.png","Promotion for July 4th 2020", "2020-07-01", "2020-07-10", 0.10);
INSERT INTO promotion (promotitle, promoimage, item_description, startdate, enddate, discountrate) VALUES ("New Year's Eve Sale - 2020", "promo3.png","Promotion for New Year's day sale in year 2020", "2020-12-29", "2021-01-02", 0.15);
INSERT INTO promotion (promotitle, promoimage, item_description, startdate, enddate, discountrate) VALUES ("Thanksgiving Weekend Sale - 2020", "promo4.png","Promotion for thanksgiving weekend sale 2020", "2020-10-23", "2020-10-30", 0.05);
INSERT INTO promotion (promotitle, promoimage, item_description, startdate, enddate, discountrate) VALUES ("Christmas Holiday Sale - 2020", "promo5.png","Promotion for Christmas holiday sale 2020", "2020-12-23", "2020-12-26", 0.10);