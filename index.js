var sys = require('sys')
var exec = require('child_process').exec;
// Load the Platform.sh configuration.
var config = require("platformsh").config();

var port = config.port;

function puts(error, stdout, stderr) {
  console.log(error);

  sys.puts(stdout);
  sys.puts(stderr);
}

var platformRelationships = config.relationships;
var database = platformRelationships.database[0];

var platformRoutes = config.routes;
var rootUrl = Object.keys(platformRoutes)[0];

var cmd = "PORT="+port+" MONGO_URL="+database.scheme+"://"+database.username+":"+database.password+"@"+database.host+":"+database.port+"/"+database.path+" ROOT_URL="+rootUrl+" node ./build/bundle/main.js";

exec(cmd, puts);
