#!/bin/bash
CODE="4/AACL4nfQ4zzJ5yj6whZAksspJD87FuMWg6yQj1EBQsOellzxfLm8CRRo8yq9ZZsxBC6M9GmZQ59Csc5t_mhGaeQ"
CLEINTID="430885082611-lnu9ib34s18f863hos40kbbq8ntu02hs.apps.googleusercontent.com"
HEADER="Content-Type: application/x-www-form-urlencoded"
CLIENTSECRET="aXsvwcZXX7a2WZosgbhM_N0r"
REDIRECTURI="urn:ietf:wg:oauth:2.0:oob"
 
# I keep the ACCESS_TOKEN and the REFRESH_TOKEN in a file.
if [ -s ~/.google ];then
    ACCESS_TOKEN=$(cat ~/.gauth | grep access_token | awk -F"," '{print $2}' | tr -d ' ')
    REFRESH_TOKEN=$(cat ~/.gauth | grep refresh_token | awk -F"," '{print $2}' | tr -d ' ')
else
    # not used before
    NEWTOKEN=$(curl -s -d "code=$CODE&amp;redirect_uri=$REDIRECTURI&amp;client_id=$CLEINTID&amp;scope=&amp;client_secret=$CLIENTSECRET&amp;grant_type=authorization_code" https://accounts.google.com/o/oauth2/token)
    ACCESS_TOKEN=$(echo $NEWTOKEN | awk -F"," '{print $1}' | awk -F":" '{print $2}' | sed s/\"//g | tr -d ' ')
    REFRESH_TOKEN=$(echo $NEWTOKEN | awk -F"," '{print $4}' | awk -F":" '{print $2}' | sed s/\"//g | sed s/}// | tr -d ' ')
    echo access_token , $ACCESS_TOKEN
    echo refresh_token , $REFRESH_TOKEN
fi
EXPIRED=$(curl -s https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=$ACCESS_TOKEN | grep 'invalid_token')
if [ "$EXPIRED" ]       
then
    echo "EXPIRED"
    REFRESHRETURN=$(curl -s -d "client_secret=$CLIENTSECRET&amp;grant_type=refresh_token&amp;refresh_token=$REFRESH_TOKEN&amp;client_id=$CLEINTID" https://accounts.google.com/o/oauth2/token)
    ACCESS_TOKEN=$(echo $REFRESHRETURN | awk -F"," '{print $1}' | awk -F":" '{print $2}' | sed s/\"//g | tr -d ' ')
    echo access_token , $ACCESS_TOKEN
    echo refresh_token , $REFRESH_TOKEN
fi 
AUTH=$ACCESS_TOKEN
# now in your curl code to retrieve the google analytics data, you use --header "Authorization: OAuth $AUTH"