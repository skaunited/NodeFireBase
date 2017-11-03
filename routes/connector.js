var express = require('express');
var mysql = require('mysql');

var connection = mysql.createPool({
  connectionLimit:50,
	host:'localhost',
	user:'root',
	password:'Cashway17',
	database:'NodeFireBase'
});

connection.getConnection(function(error,tempConn){
		if (!!error) {
			tempConn.release();
			console.log('Error');
		} else {
			console.log('connected!');
			tempConn.release();
		}
	});
module.exports = connection;
