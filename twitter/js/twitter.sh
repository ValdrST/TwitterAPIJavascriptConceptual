#!/bin/bash
#sh curlGETtweets.sh
sh curlGETtweets.sh | ./jq -c '.[] | .text' | grep "#SAviso" | sed 's/#SAviso //g' > texto.txt
mapfile -t lineas < texto.txt
touch eliminacion
touch fechas
touch mensajes
rm mensajes
touch mensajes
for linea in "${lineas[@]}"
do
	eliminarse=$(echo $linea | grep -o "#o[[:digit:]]*" | sed 's/#o//g')
	if [[ $eliminarse != "" ]]; then
		echo $eliminarse >> eliminacion #este guarda los ids que aparecen en la #o
	fi
done 
mapfile -t eliminarse < eliminacion
mapfile -t fechaDeCorte < fechas

for linea in "${lineas[@]}"; do
	identificador=$(echo $linea | grep -o "#f[[:digit:]]*" | sed 's/#f//g')
	if [[ $identificador != "" ]]; then
		fechaCorte=$(echo $linea | grep -o "#t[[:digit:]]*" | sed 's/#t//g')
		fechaActual=$(date +%y%m%d%H%M)
		#echo $linea
		if [[ $fechaActual < $fechaCorte ]]; then
			busqueda=$( cat mensajes | grep $linea )
			echo $linea >> mensajes
		fi
		if [[ $fechaCorte = "" ]]; then
			echo $linea >> mensajes
		fi
	fi
done

rm eliminacion
rm fechas
cat mensajes | sort | uniq > mensajes2
rm mensajes
mapfile -t lineas < mensajes2
for linea in "${lineas[@]}"; do
	for del in "${eliminarse[@]}"; do
		elim=$(echo $linea | grep -o "$del") 
		if [[ $elim != "" ]]; then
			sed -i /"$linea"/d mensajes2
		fi
	done
done
sed -i 's/^.\|.$//g' mensajes2 #elimino primer y ultimo caracter (eliminar las "" de la linea)
sed -i s/"#f[0-9]* "//g mensajes2 #elimina los hashtags que no interesan en el mensaje final
sed -i s/"#t[0-9]* "//g mensajes2
mv mensajes2 carrusel.txt

sh curlAnalitycs.sh |  tr , '\n' | grep "totalsForAllResults" | cut -d'"' -f6 > visitas.txt