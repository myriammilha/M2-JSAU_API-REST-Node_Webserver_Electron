#!/bin/sh

# Exit on error
set -o errexit

key_file_path=local.test.key
cert_file_path=local.test.crt

# -nodes option to not protect the private key with a passphrase
# -x509 option tells req to create a self-signed cerificate
openssl req \
        -newkey rsa:2048 -nodes -keyout $key_file_path \
        -x509 -days 1200 -out $cert_file_path

# And then give the following answers to the following questions:
#
# Country Name (2 letter code) [AU]:FR
# State or Province Name (full name) [Some-State]:.
# Locality Name (eg, city) []:Paris
# Organization Name (eg, company) [Internet Widgits Pty Ltd]:Local Test
# Organizational Unit Name (eg, section) []:
# Common Name (e.g. server FQDN or YOUR name) []:*.local.test
# Email Address []:root@localhost

chmod go-rwx $key_file_path
chmod a+r $cert_file_path

