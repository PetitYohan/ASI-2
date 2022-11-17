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

Le callback dans les messages dans les ESB ne sont pas configurés. On pensait transmettre l'url de callback directement dans le message et ainsi par requette HTTP (avec l'id de la transaction), transmettre l'information de bon déroulement des update (Card et User).

De plus, nous avions réfléchi à un système de Transaction Tampon dans lequel l'état de la transaction est stocké (userUpdate : true-false, cardUpdate : true-false). Une fois que ces attributs sont tous les deux a true, le tampon est supprimé (envoie au service notification pour notifier le user) et la transaction est donc terminée.
