$(document).ready(function () {
    var urlReq = "https://api.twitter.com/1.1/search/tweets.json";
    var qQuery = encodeURIComponent("@valdrST");
    var timestamp = new Date().getTime()/1000 | 0;
    var consumer_key = 'i3Q1c3I2PxM3BxBbEpA4LbdX8';
    var consumer_secret = 'Wy1cGiwybKKz75I3xItz48FdWcMeNIn7k7WYJ8GCUPFNrk1h3W';
    var oauth_token = '1837061498-JXQF2ZphDgGd7cqwdSRYuud5B4pP75u1Y0uP7Ws';
    var oauth_secret = 'B7kRn0rMHAdCwYUJQAFYMxyb6inlMROkk0BWAjGUYDMDu';
    var date = new Date();
    var stringDate =(date.getTime()/1000|0)+""+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+'\n';
    nonce = encodeURIComponent(btoa(stringDate));
    var signature_base_string = ("GET&"+encodeURIComponent(urlReq)+"&q%3D"+ qQuery +"%26oauth_consumer_key%3D"+consumer_key+"%26oauth_nonce%3D"+nonce+"%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D"+timestamp+"%26oauth_token%3D"+oauth_token+"%26oauth_version%3D1.0");
    var signature_key = consumer_secret+""+oauth_secret;
    var oauth_signature = encodeURIComponent(btoa(Crypto.sha1_hmac(signature_base_string,signature_key)+"\n"));
    console.log(stringDate);
    console.log(nonce);
    console.log(signature_base_string);
    console.log(signature_key);
    console.log(oauth_signature);
    $.ajax({
        type: "GET",
        url: urlReq,
        dataType: "jsonp",
        data: {
            'q': qQuery
        },
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization':('Authorization','OAuth oauth_consumer_key="'+consumer_key+'", oauth_nonce="'+nonce+'", oauth_signature="' + oauth_signature + '", oauth_signature_method="HMAC-SHA1", oauth_timestamp="' + timestamp + '", oauth_token="' + oauth_token + '", oauth_version="1.0"')
        },
        //beforeSend : function (xhr){
        //  xhr.setRequestHeader('Authorization','OAuth oauth_consumer_key="'+consumer_key+'", oauth_nonce="'+nonce+'", oauth_signature="' + oauth_signature + '", oauth_signature_method="HMAC-SHA1", oauth_timestamp= "' + timestamp + '", oauth_token, "' + oauth_token + '", oauth_version="1.0"');
        //},
        success: function (json) {
            console.log(json);
        }
    });
});