FROM ubuntu:latest
#Instalar Apache y otras dependencias
RUN apt-get update && apt-get install -y apache2
#Definir el directorio de trabajo la ruta de Apache
WORKDIR /var/www/html
#Copiar todos los archivos dentro del directorio del Dockerfil a el directorio de trabajo
COPY . .
# Expone el puerto 80 para acceder a las páginas web
EXPOSE 80
# Inicia el servidor Apache al ejecutar el contenedor
CMD ["apache2ctl", "-D", "FOREGROUND"]