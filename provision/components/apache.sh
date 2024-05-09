#!/bin/bash

apt-get update
apt-get install -y apache2

# Copy the vhost config file
cp /var/www/provision/config/apache/vhosts/solana-burn-mint.local.conf /etc/apache2/sites-available/solana-burn-mint.local.conf
cp /var/www/provision/config/apache/vhosts/api-solana-burn-mint.local.conf /etc/apache2/sites-available/api-solana-burn-mint.local.conf

# Disable the default vhost file
a2dissite 000-default

# Enable our custom vhost file
a2ensite solana-burn-mint.local.conf
a2ensite api-solana-burn-mint.local.conf

# Enable ModRewrite
a2enmod rewrite

# Restart for the changes to take effect
service apache2 restart
