var path = require('path'),
    util = require('util'),
    dirname = path.dirname(process.mainModule.filename)
;
    
module.exports = function (options) {
  var filename, json, obj;
  
  options = options || {};
  
  options.dirname   = options.dirname   || dirname;
  options.useLib    = options.useLib    || false;
  options.global    = options.global    || [];
  options.ignore    = options.ignore    || [];
  options.names     = options.names     || {};
  
  filename = path.join(options.dirname, 'package.json');
  json = require(filename);
  
  //console.log('options: ', options);
  
  global.app = global.app || {};
  
  if (options.useLib === true) {
    obj = global.app.lib = {};
  } else {
    obj = global.app;
  }
  
  for(var key in json.dependencies) {
    //console.log(key);
    if (options.ignore.indexOf(key) === -1 && key !== 'singlerequire') {
      var name = options.names[key] || key;
      
      //console.log(name);
      
      try {
        obj[name] = require(key);
      }
      catch(e) {
        console.log('Warning: (singlerequire) Cannot find module "' + key+'" which in dependencies block of file "' + filename + '"');  
        obj[name] = undefined;
      }
      
      if (options.global.indexOf(name) !== -1) {
        global[name] = obj[name];
      }
    }
  }

  //console.log(app, _);
  
}
