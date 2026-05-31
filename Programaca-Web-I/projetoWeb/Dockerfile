# Usar imagem base PHP 8.2 com Apache
FROM php:8.2-apache

# Instalar a extensão mysqli
RUN docker-php-ext-install mysqli

# Habilitar o módulo rewrite do Apache
RUN a2enmod rewrite

# Definir diretório de trabalho
WORKDIR /var/www/html

# Copiar todos os arquivos do projeto para /var/www/html
COPY . /var/www/html/

# Definir permissões apropriadas
RUN chown -R www-data:www-data /var/www/html

# Expor a porta 80
EXPOSE 80

# Iniciar o Apache em primeiro plano
CMD ["apache2-foreground"]
