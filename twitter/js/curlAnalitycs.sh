#este link es para obtener el codigo de autorizacion
#curl https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fanalytics&access_type=online&state=security_token%3D138r5719ru3e1&include_granted_scopes=true&login_hint=rurik.gotzen@gmail.com&redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=code&client_id=430885082611-lnu9ib34s18f863hos40kbbq8ntu02hs.apps.googleusercontent.com
jwt=$(sh jwt.sh)
result=$(curl -s  -m 60 --data-urlencode grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer --data-urlencode assertion=$jwt https://www.googleapis.com/oauth2/v4/token)
accessToken=$(echo $result | ./jq -c '.access_token' | sed 's/"//g')
startDate="2018-03-03"
endDdate="today"
profileID="176366157"
desiredMetric="UniquePageViews"
today=$(date "+%Y-%m-%d")
regreso=$(curl -s "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:$profileID&metrics=ga:$desiredMetric&start-date=$startDate&end-date=$today&access_token=$accessToken")
echo $regreso