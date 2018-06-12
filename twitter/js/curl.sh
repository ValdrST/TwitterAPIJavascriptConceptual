USER_EMAIL="rurik.gotzen@gmail.com" #Insert your Google Account email address here
USER_PASS="Bravo123" #Insert your password here
TABLE_ID="ga:176366157" #Insert your table ID here (ie ga:1234)

googleAuth="$(curl https://www.google.com/accounts/ClientLogin -s \
  -d Email=$USER_EMAIL \
  -d Passwd=$USER_PASS \
  -d accountType=GOOGLE \
  -d source=curl-dataFeed-v2 \
  -d service=analytics \
  | awk /Auth=.*/)"

feedUri="https://www.google.com/analytics/feeds/data\
?ids=$TABLE_ID\
&start-date=2008-10-01\
&end-date=2018-10-31\
&dimensions=ga:source,ga:medium\
&metrics=ga:sessions,ga:bounces\
&sort=-ga:sessions\
&filters=ga:medium%3D%3Dreferral\
&max-results=5\
&prettyprint=true"

curl $feedUri --silent \
  --header "Authorization: GoogleLogin $googleAuth" \
  --header "GData-Version: 2" 

  # curl https://www.google.com/accounts/ClientLogin --data "Email=rurik.gotzen@gmail.com&Passwd=Bravo123&accountType=HOSTED_OR_GOOGLE&source=430885082611-lnu9ib34s18f863hos40kbbq8ntu02hs.apps.googleusercontent.com&service=Analitycs"