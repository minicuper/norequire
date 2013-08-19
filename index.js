var path = require('path'),
    util = require('util'),
    dirname = path.dirname(process.mainModule.filename)
;
    
module.exports = function (options) {
  var filename, json, obj, split;
  
  options = options || {};
  
  options.dirname   = options.dirname   || dirname;
  if (options.appname !== '') {
    options.appname   = options.appname   || 'app';
  }
  options.global    = options.global    || [];
  options.ignore    = options.ignore    || [];
  options.names     = options.names     || {};
  
  filename = path.join(options.dirname, 'package.json');
  json = require(filename);
  
  //console.log('options: ', options);
  
  global.app = global.app || {};
  
  split = options.appname.split('.');
  
  //console.log(split);
  
  obj = global;
  
  split.forEach(function(str){
    if (str !== '') {
      obj[str] = obj[str] || {};
      obj = obj[str];
    }
  });
  
  for(var key in json.dependencies) {
    //console.log(key);
    if (options.ignore.indexOf(key) === -1 && key !== 'norequire') {
      var name = options.names[key] || key;
      
      //console.log(name);
      
      try {
        obj[name] = require(key);
      }
      catch(e) {
        console.log('Warning: (norequire) Cannot find module "' + key+'" which in dependencies block of file "' + filename + '"');  
        obj[name] = undefined;
      }
      
      if (options.global.indexOf(name) !== -1 && obj !== global) {
        global[name] = obj[name];
      }
    }
  }

  //console.log(app, _);
  
}
