# Atelier 1

Membres :

- Bertrand Pautet
- Loïc Ameglio
- Yohan Petit
- Catherine Vanden Hende

## Activités réalisées

Front en React par **Yohan**
Backend Microservices : **Bertrand, Loïc, Catherine**
ESB : **Catherine**

## Lien GitHub

https://github.com/PetitYohan/ASI-2.git

FrontEnd : achat-revente-cartes

BackEnd : asi2-backend-market

## Elements réalisés

Front : login, register, home, buy, sell, header, actualisation automatique des cartes et de l'account après achat/vente,  
Backend :

- Microservices :
  - CardService + ESB
  - AuthService
  - UserService + ESB
  - StoreService + ESB

Un user peut se créer un compte, se logguer, acheter des cartes et vendre les siennes. Quand son compte est créé, le user a automatiquement 1000$ et 5 cartes aléatoirement générées.

## Elements non-réalisés

Microservice Notifications.

Le reload de la page lors de l'achat-revente est capricieux.

Le callback dans les messages dans les ESB ne sont pas configurés. On pensait transmettre l'url de callback directement dans le message (attribut callback) et ainsi par requette HTTP (avec l'id de la transaction) transmettre l'information de bon déroulement des update (Card et User).

De plus, nous avions réfléchi à un système de Transaction Tampon dans lequel l'état de la transaction est stocké en base(idTransac : lien vers la vraie transaction, userUpdate : true-false, cardUpdate : true-false). Une fois que les attributs d'update sont tous les deux a true, le tampon est supprimé et on envoie au service notification les infos de la transaction pour notifier le user. La ttransaction est donc terminée à la fin de ce process.

## Lancer le projet :

### FrontEnd React :

cd ./achat-revente-cartes

npm install

npm start

### BackEnd SpringBoot : 

Prérequis : maven version 3.6.0, docker installés

cd asi2-backend-market

./launch.sh
