# Norequire

Single "require" in your node.js app

## Install

<pre>
  npm install norequire
</pre>


## Super simple to use

Norequire use **global.app**  and data from **package.json** to automatical link all dependencies.

Your app **package.json**
```json
{
    "name": "application-name"
  , "version": "0.0.1"
  , "dependencies": {
      "express": "latest"
    , "express3-handlebars": "latest"
    , "request": "latest"
    , "underscore": "latest"
    , "async": "latest"
    , "handlebars": "latest"
  }
}
```

Your **app.js**
```javascript
require('norequire')();

```
After that you can access to all the packages in all your project js-files using **app** var.

For example:
```javascript
app.async.series(
  ...
);
```


## Options

You can pass some options in require:

```javascript
var options = {
  appname: 'app.lib',
  dirname: __dirname,
  names: {'underscore': '_'},
  global: ['_', 'async'],
  ignore: ['handlebars']
};
require('singlerequire')(options);
```

 - `appname`    Use your global object instead of `app` for packages (**app** by default)
 - `dirname`    Dirname for your app **package.json** (**prosess.mainModule.filename - dir** by default)
 - `names`      Map of aliases, for example {'underscore': '_'} 
 - `global`     Array of packages that should be global for all app js-files (['_', 'async'] for example) - use aliase if it is
 - `ignore`     Array of packages that should be ignored
