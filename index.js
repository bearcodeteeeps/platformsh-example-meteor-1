var sys = require('sys')
var exec = require('child_process').exec;
var atob = require('atob');

var base64PlatformRelationships = process.env.PLATFORM_RELATIONSHIPS;
var base64PlatformRoutes = process.env.PLATFORM_ROUTES;
var port = process.env.PORT;

function puts(error, stdout, stderr) {
  console.log(error);

  sys.puts(stdout);
  sys.puts(stderr);
}

if(base64PlatformRelationships && base64PlatformRoutes) {
  var platformRelationships = JSON.parse(atob(base64PlatformRelationships));
  var database = platformRelationships.database[0];

  var platformRoutes = JSON.parse(atob(base64PlatformRoutes));
  console.log(platformRelationships);
  var rootUrl = Object.keys(platformRoutes)[0];

  var cmd = "PORT="+port+" MONGO_URL="+database.scheme+"://"+database.username+":"+database.password+"@"+database.host+":"+database.port+"/"+database.path+" ROOT_URL="+rootUrl+" node ./build/bundle/main.js --port "+port;
  console.log(cmd);

  exec(cmd, puts);
}
