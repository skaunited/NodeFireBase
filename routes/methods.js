var firebase = require("firebase");
var connector = require('./connector.js');
firebase.initializeApp({
  serviceAccount:"./Kiss-3c82b6583c78.json",
  databaseURL: "https://kiss-a31cc.firebaseio.com/"
});

module.exports = {
  listPending:function(){
    var ref = firebase.database().ref("Pending");
  	var dict = {};
    var source;
    ref.on("value", function(snapshot) {
      dict = snapshot.val();
  		var array = [];
  		for (i = 0; i < Object.keys(dict).length; i++) {
  			array[i] = dict[Object.keys(dict)[i]];
  			array[i].id = Object.keys(dict)[i];
  		}
  		source = array;
  	});
    while(source === undefined) {
      require('deasync').runLoopOnce();
    }
    return source;
  },
  validEventMethode:function(id){
    var pendingRef = firebase.database().ref("Pending");
  	var eventsRef = firebase.database().ref("Events");
    var oldRef = pendingRef.child(id);
    var newRef = eventsRef.child(id);

    console.log("pendingRef ==========>"+pendingRef);
    console.log("eventsRef  ==========>"+eventsRef);
    console.log("Object Pending Ref ==========>"+oldRef);
    console.log("Object event Ref ==========>"+newRef);
    oldRef.once('value', function(snap)  {
         newRef.set( snap.val(), function(error) {
           if( !error ) {
               oldRef.remove(function(err) {
                 if( !err ) {
                     console.log("Event deleted----------->"+oldRef);
                   }else{
                     console.log("we cannot deleted that ----------->"+oldRef+"  ---->>> Event");
                   }
               });
               console.log("Odkhel nayek l rejeted ----------->"+newRef);
             }
           else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
         });
    });
  },
  rejectEventMethode:function(id){
    var pendingRef = firebase.database().ref("Pending");
    var rejectsRef = firebase.database().ref("Rejects");
    var oldPendingRef = pendingRef.child(id);
    var newRejectedRef = rejectsRef.child(id);
    console.log("Racine d'venements valide ==========>"+pendingRef);
    console.log("Racine d'venements rejeter ==========>"+rejectsRef);
    console.log("Racine ID d'venement valide ==========>"+oldPendingRef);
    console.log("Racine ID d'venement rejeter ==========>"+newRejectedRef);
    oldPendingRef.once('value', function(snap)  {
         newRejectedRef.set( snap.val(), function(error) {
              if( !error ) {
                  oldPendingRef.remove(function(err) {
                    if( !err ) {
                        console.log("Event deleted----------->"+oldPendingRef);
                      }else{
                        console.log("we cannot deleted that ----------->"+oldPendingRef+"  ---->>> Event");
                      }
                  });
                  console.log("Odkhel nayek l rejeted ----------->"+newRejectedRef);
                }
              else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
         });
    });
  },
  rejectValideEventMethode:function(id){
    var eventsgRef = firebase.database().ref("Events");
    var rejectsRef = firebase.database().ref("Rejects");
    var oldEventRef = eventsgRef.child(id);
    var newRejectedRef = rejectsRef.child(id);
    console.log("Racine d'venements valide ==========>"+eventsgRef);
    console.log("Racine d'venements rejeter ==========>"+rejectsRef);
    console.log("Racine ID d'venement valide ==========>"+oldEventRef);
    console.log("Racine ID d'venement rejeter ==========>"+newRejectedRef);
    oldEventRef.once('value', function(snap)  {
         newRejectedRef.set( snap.val(), function(error) {
              if( !error ) {
                  oldEventRef.remove(function(err) {
                    if( !err ) {
                        console.log("Event deleted----------->"+oldEventRef);
                      }else{
                        console.log("we cannot deleted that ----------->"+oldEventRef+"  ---->>> Event");
                      }
                  });
                  console.log("Odkhel nayek l rejeted ----------->"+newRejectedRef);
                }
              else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
         });
    });
  },
  totalUsers:function(){
    var ref = firebase.database().ref("Users");
    var dict = {};
    var source;
    ref.on("value", function(snapshot) {
      dict = snapshot.val();
  		var array = [];
  		for (i = 0; i < Object.keys(dict).length; i++) {
  			array[i] = dict[Object.keys(dict)[i]];
  			array[i].id = Object.keys(dict)[i];
  		}
  		source = array;
  	});
    while(source === undefined) {
      require('deasync').runLoopOnce();
    }
    return source;
  },
  totalCategorys:function(){
    var ref = firebase.database().ref("Categories");
    var dict = {};
    var source;
    ref.on("value", function(snapshot) {
      dict = snapshot.val();
  		var array = [];
  		for (i = 0; i < Object.keys(dict).length; i++) {
  			array[i] = dict[Object.keys(dict)[i]];
  			array[i].id = Object.keys(dict)[i];
  		}
  		source = array;
  	});
    while(source === undefined) {
      require('deasync').runLoopOnce();
    }
    return source;
  },
  totalEvents:function(){
    var ref = firebase.database().ref("Events");
    var dict = {};
    var source;
    ref.on("value", function(snapshot) {
      dict = snapshot.val();
  		var array = [];
  		for (i = 0; i < Object.keys(dict).length; i++) {
  			array[i] = dict[Object.keys(dict)[i]];
  			array[i].id = Object.keys(dict)[i];
  		}
  		source = array;
  	});
    while(source === undefined) {
      require('deasync').runLoopOnce();
    }
    return source;
  },
  deleteUser:function(id) {
  // Now we can get back to that item we just pushed via .child().
    var usersRef = firebase.database().ref("Users");
    var userRef = usersRef.child(id);
    userRef.remove(function(error) {
      if( !error ) {
          console.log("User deleted----------->"+userRef);
        }else{
          console.log("we cannot deleted that ----------->"+userRef+"  ---->>> USER");
        }
    });
  },
  deleteCategory:function(categoryID) {
    var source;
    var categoryRef = firebase.database().ref("Categories");
    var categoryChildRef = categoryRef.child(categoryID);
    categoryChildRef.remove(function(error) {
      if( !error ) {
          console.log("User deleted----------->"+categoryChildRef);
          source = true;
        }else{
          console.log("we cannot deleted that ----------->"+categoryChildRef+"  ---->>> USER");
          source = false;
        }
    });
    while(source === undefined) {
      require('deasync').runLoopOnce();
    }
    return source;
  },
  logVerif:function(email,password) {
    var source;
    var sqlRequest = "SELECT * from user where UserEmail = '"+email+"'";
    connector.query(sqlRequest,function(error,rows,fields){
      if (!!error) {
          console.log(sqlRequest);
          console.log("error in the query of check email user");
          source = false;
      }else{
          if (password.localeCompare(rows[0].UserPass) === 0) {
            console.log("======"+password+"=== IS EQUAL TO ==="+rows[0].UserPass);
            source = true;
          }else{
            console.log("======"+password+"=== IS NOT EQUAL TO ==="+rows[0].UserPass);
            source = false;
          }
      }
    });
    while(source === undefined) {
      require('deasync').runLoopOnce();
    }
    return source;
  },
  updateEventValue:function(eventID,coverUrl,eventName,startDate,category,price) {
    var pendingRef = firebase.database();
    var evenement = {
                beginDate : startDate,
                cover     : coverUrl,
                name      : eventName,
                categorie : category,
                price     : price
    };
    pendingRef.ref('Pending/'+eventID).update(evenement);
    source = true;
    while(source === undefined) {
      require('deasync').runLoopOnce();
    }
    return source;
  },
  addCategory:function(categoryIndex,categoryName,categoryPictureURL) {
    var categoryRef = firebase.database().ref('Categories');
    var categoryObject = {
                index         : categoryIndex,
                name          : categoryName,
                photoUrl      : categoryPictureURL
    };
    categoryRef.push(categoryObject);
    source = true;
    while(source === undefined) {
      require('deasync').runLoopOnce();
    }
    return source;
  }
};
