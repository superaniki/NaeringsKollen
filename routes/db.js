
/*
 * GET home page.
 */

mongojs = require('mongojs');


exports.list = function(req, res){

  
  var nkDB = mongojs('nk');
  var livsmedel = nkDB.collection('livsmedel');


  livsmedel.find(function(err, docs) {

  	var j = JSON.stringify()
  	res.send(docs);
    // docs is an array of all the documents in mycollection
  });
  

  
};