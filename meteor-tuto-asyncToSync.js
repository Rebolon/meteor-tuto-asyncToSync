if (Meteor.isServer) {
  Meteor.startup(function () {
    //
    var iconv = Meteor.require('iconv-lite'),
        stdRequest = Npm.require('request');
    var requestAsync = function(url, options, cb) {
      if (typeof options.encoding === 'object') {
        encoding = options.encoding;
        options.encoding = null;
      }
      
      stdRequest.get(url, options, function (err, response, body) {
        if (encoding !== undefined) {
          var buf = iconv.decode(response.body, encoding.src),
              body = iconv.encode(buf, encoding.dest).toString('binary');
          response.body = body;
        }
        
        cb && cb(null, response);
      });
    },
        requestSync = Meteor._wrapAsync(requestAsync);
    
    // code to run on server at startup
    console.log('startup');
    var url = "http://www.leboncoin.fr/ventes_immobilieres/offres/rhone_alpes/rhone/?f=a&th=1&ps=8&pe=9&ros=5&roe=5&ret=1&location=Anse%2069480",
        fs = Npm.require('fs');
    
    response = requestSync(url, {"encoding": {"dest": "iso-8859-15", "src": "iso-8859-1"}});
    fs.writeFile('/home/action/workspace/projects/meteor-tuto-asyncToSync/public/dump.html', response.body);
    
    console.log('end');
  });
}
