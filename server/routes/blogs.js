var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure,
    MongoClient = mongo.MongoClient;

//var local=true;
//var server = new Server('localhost', 27017, {auto_reconnect: true});

var local=false;
var server = new Server('ds039078.mongolab.com', 39078, {auto_reconnect: true}, {w:0, native_parser: false});

//var server = new MongoClient(new Server('mongodb://ds039078.mongolab.com', 39078, {auto_reconnect: true}));

db = new Db('nodeblog', server, {fsync:true});

db.open(function(err, db) {
  	  	if(!err) {
  	  		/*
  	  		 * Using local !
  	  		 */
  	        console.log("Connected to 'nodeblog' database");
         	if (!local){
	         	db.authenticate('emzweb', '*********', function(err, res) {
			          if(!err) {
	               	 	db.collection('blogs', {safe:true}, function(err, collection) {
							//populateDB();
				            if (err) {
				                console.log("The 'blogs' collection doesn't exist. Creating it with sample data...");
				                populateDB();
				            }
			        	});
	                } else {
		                console.log("Error in authentication.");
		                console.log(err);
		            }
	         	});
         	}
	    } else {
	        console.log("Error in open().");
	        console.log(err);
	    }
});
/* With mongolab (username: emzweb, pass : a*****1)
 *
 * To connect using the shell:
 * mongo ds039078.mongolab.com:39078/nodeblog -u <dbuser> -p <dbpassword>
 * To connect using a driver via the standard URI (what's this?):
 * mongodb://<dbuser>:<dbpassword>@ds039078.mongolab.com:39078/nodeblog
 */
/*

*/
exports.findById = function(req, res) {
    var id = req.params.id;
    if (parseInt(id,10) > 0){
	    console.log('Retrieving blog: ' + id);
	    db.collection('blogs', function(err, collection) {
	        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
	            res.send(item);
	        });
	    });
	}
};

exports.findByUrl = function(req, res) {
    var url = req.params.url;
    if (url!="" && url!=null && url!=undefined){
	    console.log('Retrieving blog with url : ' + url);
	    db.collection('blogs', function(err, collection) {
	        collection.findOne({'url':url}, function(err, item) {
	            res.send(item);
	        });
	    });
	}
};

exports.findAll = function(req, res) {
    db.collection('blogs', function(err, collection) {
		/*
		 * returns only header
		 *
		collection.find({ }, { header: 1 }).toArray(function(err, items) {
            res.send(items);//Empty
        });
    	*/
    	/*
    	 * return all data
    	 */
        collection.find().sort({'time':-1}).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addblog = function(req, res) {
    var blog = req.body,
    blogString=JSON.stringify(blog);
  	blogJson=JSON.parse(blogString),
  	userName = req.user.username;

	blogJson.username = userName;

    console.log('Adding blog: ' + JSON.stringify(blogJson));
    db.collection('blogs', function(err, collection) {
        collection.insert(blogJson, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateblog = function(req, res) {
    var id = req.params.id;
    var blog = req.body;
    console.log('Updating blog: ' + id);
    console.log(JSON.stringify(blog));
	/*
	 * Need to delete _id key as MongoDB Error on trying to update
	 */
	delete blog._id;
	/*
	 * Update :
	 */
    db.collection('blogs', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, blog, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating blog: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(blog);
            }
        });
    });
}

exports.deleteblog = function(req, res) {
    var id = req.params.id;
    console.log('Deleting blog: ' + id);
    db.collection('blogs', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

var populateDB = function() {

    var blogs = [
    {
    	header: "Test 1",
        description: "This is Test 1 .."
    },
    {
    	header: "Test 2",
        description: "This is Test 2..."
    }];

    db.collection('blogs', function(err, collection) {
        collection.insert(blogs, {safe:true}, function(err, result) {});
    });

    console.log('populating DB');

};

var flushDB = function (){
	db.collection('blogs', function(err, collection) {
        collection.remove({}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};
