$(document).ready(function () {
    $.getScript("js/*.js");
    var urlReq = "https://api.twitter.com/1.1/search/tweets.json";
    var qQuery = "@valdrST";
    $.ajax({
        type: "GET",
        url: urlReq,
        data: {
            q: qQuery
        },
        dataType: "json",
        success: function (response) {
            
        }
    });
    var timestamp = new Date().getTime()/1000 | 0;
    var consumer_key = 'i3Q1c3I2PxM3BxBbEpA4LbdX8';
    var consumer_secret = 'Wy1cGiwybKKz75I3xItz48FdWcMeNIn7k7WYJ8GCUPFNrk1h3W';
    var oauth_token = '1837061498-JXQF2ZphDgGd7cqwdSRYuud5B4pP75u1Y0uP7Ws';
    var oauth_secret = 'B7kRn0rMHAdCwYUJQAFYMxyb6inlMROkk0BWAjGUYDMDu';
    var date = new Date();
    var stringDate = (date.getTime()/1000|0)+""+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+'\n';
    nonce = btoa(stringDate);
    var signature_base_string = "GET&"+urlReq+"&q="+ qQuery +"&oauth_consumer_key="+consumer_key+"&oauth_nonce="+nonce+"&oauth_signature_method=HMAC-SHA1&oauth_timestamp="+timestamp+"&oauth_token="+oauth_token+"&oauth_version=1.0";
    var signature_key = consumer_secret+""+oauth_secret;
    var oauth_signature = Crypto.sha1_hmac(signature_base_string,signature_key);
    xhr.setRequestHeader('Authorization','OAuth oauth_consumer_key="'+consumer_key+'", oauth_nonce="'+nonce+'", oauth_signature="' + oauth_signature + '", oauth_signature_method="HMAC-SHA1", oauth_timestamp= "' + timestamp + '", oauth_token, "' + oauth_token + '", oauth_version="1.0"');
});