
googleAuth="$(curl https://www.google.com/accounts/ClientLogin -s \
 -d Email=rurik.gotzen@gmail.com \
 -d Passwd=Bravo123 \
 -d accountType=GOOGLE \
 -d source=curl-accountFeed-v1 \
 -d service=analytics \
 | grep "Auth=" | cut -d"=" -f2)"

feedUri="https://www.googleapis.com/analytics/v3/data/ga\
?start-date=$START_DATE\
&end-date=$END_DATE\
&ids=ga:$PROFILE_ID\
&dimensions=ga:userType\
&metrics=ga:users\
&max-results=50\
&prettyprint=false"

curl $feedUri -s --header "Authorization: GoogleLogin auth=$googleAuth"