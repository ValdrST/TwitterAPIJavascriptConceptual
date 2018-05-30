$(document).ready(function () {
	const oauth = OAuth({
	  consumer: {
	    key: 'i3Q1c3I2PxM3BxBbEpA4LbdX8',
	    secret: 'Wy1cGiwybKKz75I3xItz48FdWcMeNIn7k7WYJ8GCUPFNrk1h3W'
	  },
	  signature_method: 'HMAC-SHA1',
	  hash_function(base_string, key) {
	    return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
	  }
	});

	const request_data = {
		url: 'https://api.twitter.com/1.1/search/tweets.json',
		method: 'GET',
		data: { q: '#amlo2018' }
	};

	const token = {
	  key: '1837061498-JXQF2ZphDgGd7cqwdSRYuud5B4pP75u1Y0uP7Ws',
	  secret: 'B7kRn0rMHAdCwYUJQAFYMxyb6inlMROkk0BWAjGUYDMDu'
	};
	$.ajax({
	  	url: request_data.url,
	  	type: request_data.method,
	  	data: oauth.authorize(request_data, token)
		}).done(function(data) {
			console.log(data);
	  	// Process your data here
		});
});