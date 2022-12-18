# ASI-2

ASI-2: Framework frontend, services orientés architecture (S9)

Membres :

- Bertrand Pautet
- Loïc Ameglio
- Yohan Petit
- Catherine Vanden Hende

## Activités réalisées

**Yohan** : front + jeu

**Bertrand** : front + chat

**Loïc** : jeu

**Catherine** : chat + jeu

## Lien GitHub

https://github.com/PetitYohan/ASI-2.git

FrontEnd : achat-revente-cartes

BackEnd : asi2-backend-market

Chat + jeu : chat-play

## Elements réalisés

Front en react

Back-end en node.js : messagerie instantanée et jeu.

### Messagerie : 
- Possibilté de communiquer avec une personne en particulier (choix de la personne parmi les utilisateurs)
- Apparait lors d'un jeu

### Jeu : 
- Choix de 5 cartes (pas plus, pas moins) parmi les siennes
- Attente d'un deuxième joueur pour entrer dans une room
- A tour de rôle, attaquer avec une de ses cartes la carte d'un adversaire (une alerte apparait lorsqu'on essaye d'attaquer et que ce n'est pas notre tour, l'action étant refusée)
- 2 attaques/tour 
- Pas d'attaque sur ou avec une carte déjà "morte" (avec 0 de vie) 

### Dockerisation :
Le back-end java est dockerisé.

## Elements non-réalisés

Microservice Notifications.

Pas de communication "à tout le monde" dans le service de messagerie.

Le jeu n'a pas de gestion de mana incrémentable, pas de possibilité de sauter son tour. 

La gestion de la mise et de l'argent gagné ou perdu n'est pas faite non plus.

Pas de tests unitaires et de non-régression.

Pas d'intégration de react dans docker (pas servi par un nginx).

## Lancer le projet :

### FrontEnd React :

cd achat-revente-cartes

npm install

npm start

### BackEnd SpringBoot :

Prérequis : maven version 3.6.0, docker installés

cd asi2-backend-market

./launch.sh

### BackEnd SpringBoot :

cd chat-play

npm install

npm start
