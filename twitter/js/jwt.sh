KEY='key'
header='{"alg":"RS256","typ":"JWT"}'
aud='https://www.googleapis.com/oauth2/v4/token'
endexp=$(date +%s)
exp=$(($endexp + 3000))
iat=$(($endexp))
iss='contador-de-visitas-eingler@contador-de-visitas-206601.iam.gserviceaccount.com'
sub='contador-de-visitas-eingler@contador-de-visitas-206601.iam.gserviceaccount.com' #este se tuvo que añadir a los usuarios de la cuenta de analytics
scope='https://www.googleapis.com/auth/analytics'
claim="{\"aud\":\"$aud\",\"exp\":\"$exp\",\"iat\":\"$iat\",\"iss\":\"$iss\",\"scope\":\"$scope\",\"sub\":\"$sub\"}"
header_b64=$(echo -n "$header" | base64 -w 0 | sed 's/+/-/g;s/\//_/g;s/=//g')
claim_b64=$(echo -n "$claim" | base64 -w 0 | sed 's/+/-/g;s/\//_/g;s/=//g')
signature_b64=$(echo -n "$header_b64.$claim_b64" | openssl dgst -sha256 -sign $KEY | base64 -w 0 | sed 's/+/-/g;s/\//_/g;s/=//g')
jwt=$(echo -n "$header_b64.$claim_b64.$signature_b64")
echo $jwt