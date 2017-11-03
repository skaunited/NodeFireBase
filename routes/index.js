var express = require('express');
var router = express.Router();
var methods = require('./methods.js');
var sleep = require('thread-sleep');
var log = require('./athentification.js');



/* GET home page. */
router.get('/', function(req, res, next) {
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('index');
	}else{
		res.render('index');
	}
});
/* GET home page. */
router.get('/logout', function(req, res, next) {
	var logout = log.setLog(false);
	if (logout === false) {
		res.render('index');
	}else{
		res.render('home');
	}
});
/* GET home page. */
router.get('/gologin', function(req, res, next) {
	var email = req.query.email;
	var password = req.query.pass;
	console.log(email);
	console.log(password);
	var bool;
	var logVerif = methods.logVerif(email,password);
	console.log("====="+logVerif);
	if (logVerif === true) {
		bool = log.setLog(true);
		var listPendingValue = methods.listPending();
		var usersCount = methods.totalUsers();
		var cathegorysCount = methods.totalCategorys();
		var eventsCount = methods.totalEvents();
		res.render('home', { array: listPendingValue, usersCount:usersCount, cathegorysCount: cathegorysCount,eventsCount:eventsCount});
	}else{
		bool = log.setLog(false);
		res.render('index');
	}
});
/* GET home page. */
router.get('/home', function(req, res, next) {
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		var listPendingValue = methods.listPending();
		var usersCount = methods.totalUsers();
		var cathegorysCount = methods.totalCategorys();
		var eventsCount = methods.totalEvents();
		res.render('home', { array: listPendingValue, usersCount:usersCount, cathegorysCount: cathegorysCount,eventsCount:eventsCount});
	}
});
/* GET pending events  page. */
router.get('/pendings', function(req, res, next) {
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		var listPendingValue = methods.listPending();
		var usersCount = methods.totalUsers();
		var cathegorysCount = methods.totalCategorys();
		var eventsCount = methods.totalEvents();
		res.render('pendings', { array: listPendingValue, usersCount:usersCount, cathegorysCount: cathegorysCount,eventsCount:eventsCount});
	}
});
/* GET valid events page. */
router.get('/validevents', function(req, res, next) {
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		var listPendingValue = methods.listPending();
		var usersCount = methods.totalUsers();
		var cathegorysCount = methods.totalCategorys();
		var eventsCount = methods.totalEvents();
		res.render('validevents', { array: listPendingValue, usersCount:usersCount, cathegorysCount: cathegorysCount,eventsCount:eventsCount});
	}
});
/* GET valid Category page. */
router.get('/category', function(req, res, next) {
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		var listPendingValue = methods.listPending();
		var usersCount = methods.totalUsers();
		var cathegorysCount = methods.totalCategorys();
		var eventsCount = methods.totalEvents();
		res.render('allcathegory', { array: listPendingValue, usersCount:usersCount, cathegorysCount: cathegorysCount,eventsCount:eventsCount});
	}
});
/* GET home page. */
router.get('/allusers', function(req, res, next) {
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		var listPendingValue = methods.listPending();
		var usersCount = methods.totalUsers();
		var cathegorysCount = methods.totalCategorys();
		var eventsCount = methods.totalEvents();
		res.render('allusers', { array: listPendingValue, usersCount:usersCount, cathegorysCount: cathegorysCount,eventsCount:eventsCount});
	}
});
/* GET Edit events page. */
router.get('/editevent', function(req, res, next) {
	var id = req.query.id;
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		var arrayreturned=[];
		var onePendingValue = methods.listPending();
		for (var i = 0; i < onePendingValue.length; i++) {
			console.log("============================"+onePendingValue[i].id);
			console.log("++++++++++++++++++++++++++++"+typeof onePendingValue[i].id);
			console.log("----------------------------"+id);
			console.log("++++++++++++++++++++++++++++"+typeof id);
			if (id.localeCompare(onePendingValue[i].id) === 0 ) {
				arrayreturned[0] = onePendingValue[i];
				console.log("valie compare");
				var name;
				console.log("valie compare"+arrayreturned[0].name);
			}
		}
		res.render('editevent', { array: arrayreturned[0]});
	}
});
/* GET Edit events page. */
router.get('/validEditEvent', function(req, res, next) {
	var eventID = req.query.eventID;
	var coverUrl = req.query.coverUrl;
	var eventName = req.query.eventName;
	var startDate = req.query.startDate;
	var category = req.query.category;
	var price = req.query.price;

	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		var bootVal = methods.updateEventValue(eventID,coverUrl,eventName,startDate,category,price);
		var listPendingValue = methods.listPending();
		if (bootVal === true) {
			res.render('pendings', { array: listPendingValue});
		}else {
			res.render('error403');
		}
	}
});
/* GET Edit events page. */
router.get('/addCat', function(req, res, next) {
	var categoryIndex = req.query.categoryIndex;
	var categoryName = req.query.categoryName;
  var categoryPictureURL =  req.query.categoryPictureURL;
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		var bootVal = methods.addCategory(categoryIndex,categoryName,categoryPictureURL);
		var cathegorysCount = methods.totalCategorys();
		if (bootVal === true) {
			res.render('allcathegory', { cathegorysCount: cathegorysCount});
		}else {
			res.render('error403');
		}
	}
});
/* GET Edit events page. */
router.get('/deleteCategory', function(req, res, next) {
	var categoryID = req.query.categoryID;
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		var bootVal = methods.deleteCategory(categoryID);
		var cathegorysCount = methods.totalCategorys();
		if (bootVal === true) {
			res.render('allcathegory', { cathegorysCount: cathegorysCount});
		}else {
			res.render('error403');
		}
	}
});
/* GET home page. */
router.get('/buttons', function(req, res, next) {
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
	//var listPendingValue = methods.listPending();
	res.render('buttons', { array: "hello"});
	}
});


/* GET home page. */
router.get('/login', function(req, res, next) {
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
	//var listPendingValue = methods.listPending();
	res.render('index', { array: "hello"});
	}
});

/* GET home page. */
router.get('/tables', function(req, res, next) {
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
	//var listPendingValue = methods.listPending();
		res.render('tables', { array: "hello"});
	}
});

/* GET home page. */
router.get('/widgets', function(req, res, next) {
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		//var listPendingValue = methods.listPending();
		res.render('widgets', { array: "hello"});
	}
});


/* GET home page. */
router.get('/invoice', function(req, res, next) {
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		//var listPendingValue = methods.listPending();
		res.render('invoice', { array: "hello"});
	}
});

/* GET home page. */
router.get('/interface', function(req, res, next) {
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		//var listPendingValue = methods.listPending();
		res.render('interface', { array: "hello"});
	}
});

/* GET home page. */
router.get('/index2', function(req, res, next) {
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
	//var listPendingValue = methods.listPending();
	res.render('index2', { array: "hello"});
	}
});
/* GET home page. */
router.get('/index', function(req, res, next) {
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		var listPendingValue = methods.listPending();
		res.render('index1', { array: listPendingValue});
	}
});
/* GET home page. */
router.get('/grid', function(req, res, next) {
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		//var listPendingValue = methods.listPending();
		res.render('grid', { array: "hello"});
	}
});
/* GET home page. */
router.get('/gallery', function(req, res, next) {
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		//var listPendingValue = methods.listPending();
		res.render('gallery', { array: "hello"});
	}
});
/* GET home page. */
router.get('/form-wizard', function(req, res, next) {
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		//var listPendingValue = methods.listPending();
		res.render('form-wizard', { array: "hello"});
	}
});
/* GET home page. */
router.get('/form-validation', function(req, res, next) {
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		//var listPendingValue = methods.listPending();
		res.render('form-validation', { array: "hello"});
	}
});
/* GET home page. */
router.get('/form-common', function(req, res, next) {
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		//var listPendingValue = methods.listPending();
		res.render('form-common', { array: "hello"});
	}
});
/* GET home page. */
router.get('/chat', function(req, res, next) {
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		//var listPendingValue = methods.listPending();
		res.render('chat', { array: "hello"});
	}
});
/* GET home page. */
router.get('/calendar', function(req, res, next) {
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		//var listPendingValue = methods.listPending();
		res.render('calendar', { array: "hello"});
	}
});
/* GET home page. */
router.get('/charts', function(req, res, next) {
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		//var listPendingValue = methods.listPending();
		res.render('charts', { array: "hello"});
	}
});
/* GET home page. */
router.get('/error403', function(req, res, next) {
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		//var listPendingValue = methods.listPending();
		res.render('error403', { array: "hello"});
	}
});
/* GET home page. */
router.get('/error404', function(req, res, next) {
	//var listPendingValue = methods.listPending();
	res.render('error404');
});
/* GET home page. */
router.get('/error405', function(req, res, next) {
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		//var listPendingValue = methods.listPending();
		res.render('error405', { array: "hello"});
	}
});
/* GET home page. */
router.get('/error500', function(req, res, next) {
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		//var listPendingValue = methods.listPending();
		res.render('error500', { array: "hello"});
	}
});




/* GET home page. */
router.get('/validEvent', function(req, res, next) {
	var id = req.query.id;
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		methods.validEventMethode(id);
		res.redirect("/pendings");
	}
});

/* GET home page. */
router.get('/rejectEvent', function(req, res, next) {
	var id = req.query.id;
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		methods.rejectEventMethode(id);
		res.redirect("/pendings");
	}
});
/* GET home page. */
router.get('/rejecteValideEvent', function(req, res, next) {
	var id = req.query.id;
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		methods.rejectValideEventMethode(id);
		res.redirect("/validevents");
	}
});
/* GET home page. */
router.get('/rejectUser', function(req, res, next) {
	var id = req.query.id;
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		methods.deleteUser(id);
		res.redirect("/allusers");
	}
});



/* GET home page. */
router.get('/rejectEve', function(req, res, next) {
	var id = req.query.id;
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{

		//firebase.database().ref("Pending").child(id).child("state").set("rejected");//.once('value', (snapshot) => {
			var oldRef = firebase.database().ref("Pending").child(id).ref();//.child("state").set("pending");
			var newRef = firebase.database().ref("rejected").child(id).ref();
			moveFbRecord(oldRef, newRef);
			// console.log(snapshot.val()+"");
			// firebase.database().ref("Rejected").child(id).set(snapshot.val()).once('value', (snap) => {
			// 	// firebase.database().ref("Rejected/"+id).child("state").set(false);
			// 	snapshot.ref.child("state").set(true);
			// });
			// firebase.database().ref("Pending").child(id).remove();
		// 	return res.redirect('http://37.59.19.10:9999/');
		// });

		//res.render('index', { array: array});
	}
});

/* GET home page. */
router.get('/eventToPending', function(req, res, next) {
	var id = req.query.id;
	var loggedIn = log.getLog();
	if (loggedIn === false) {
		res.render('error404');
	}else{
		var oldRef = firebase.database().ref("Events").child(id).ref();//.child("state").set("pending");
		var newRef = firebase.database().ref("Pending").child(id).ref();
		moveFbRecord(oldRef, newRef);
		// var ref = firebase.database().ref("Events").child(id).once('value', (snapshot) => {
		// 	// console.log(snapshot.val()+"");
		// 	if (!snapshot.exists())
		// 		return;
		// 	firebase.database().ref("Pending").child(id).set(snapshot.val());
		// 	//snapshot.child("Pending").child(id).child("state").set(false);
		// 	//snapshot.child("Events").child(id).child("state").set(true);
		// 	// firebase.database().ref("Events").child(id).remove();
		return res.redirect('http://37.59.19.10:9999/events/');
		//id = null;
		// });

		//res.render('index', { array: array});
	}
});
module.exports = router;
