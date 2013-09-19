if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
	console.log('startup');
	var url = "http://www.leboncoin.fr/ventes_immobilieres/offres/rhone_alpes/rhone/?f=a&th=1&ps=8&pe=9&ros=5&roe=5&ret=1&location=Anse%2069480",
	    iconv = Meteor.require('iconv-lite'),
	    request = Npm.require('request'),
	    fs = Npm.require('fs'),
	    callMeLaterAsync = function(url, options, cb) {
		request.get(url, options, function (err, response, body) {
			cb && cb(null, response);
		});
	    },
	    callMeLaterSync = Meteor._wrapAsync(callMeLaterAsync);

	response = callMeLaterSync(url, {"encoding": null});
	var buf = iconv.decode(response.body, 'iso-8859-15'),
            body = iconv.encode(buf, 'iso-8859-1').toString('binary');

	fs.writeFile('/home/action/workspace/projects/meteor-tuto-asyncToSync/dump.html', body);

	console.log('end');
  });
}
