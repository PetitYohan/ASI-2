# ASI-2

ASI-2: Framework frontend, services orientés architecture (S9)

## Diagramme des micro-services :

![image](Images/Diagramme-Micro-services.drawio.png)

## Liste requêtes :

| Type | Source | Destination | Requête                      | Attributs                        |
| ---- | ------ | ----------- | ---------------------------- | -------------------------------- |
| GET  | Client | Auth        | /api/auth/                   | user_id, mdp                     |
| GET  | Auth   | User        | /api/user/                   | user_id                          |
| GET  | Client | Store       | /api/store/buy/              | user_id, card_id                 |
| POST | Store  | Card        | /api/card/                   | idTransaction, card_id , user_id |
| POST | Store  | User        | /api/user/                   | idTransaction, user_id, money    |
| GET  | Card   | Store       | /api/store/transaction/card/ | idTransaction, card_id           |
| GET  | User   | Store       | /api/store/transaction/user/ | idTransaction, user_id           |

## Composants REACTJS :

### NavBar :

Paramètres : Utilisateur, pageTitle

![image](Images/Composant_NavBar.png)

### Log Up :

Sorties : addUser()

![image](Images/Composant_LogUp.png)

### Log In :

Sorties : login()

![image](Images/Composant_LogIn.png)

### Home :

Composants : NavBar

Liens : Buy, Shell, Play

![image](Images/Composant_Home.png)

### Card :

Paramètres : Card

![image](Images/Composant_Card.png)

### CardList :

Paramètres : CardList
Sortie: CardSelect

![image](Images/Composant_CardList.png)

### CardTransfert :

Paramètres : TransactionType, TitrePage

Sorties : Action(Buy or Sell)

Buy :

![image](Images/Composant_Buy.png)

Sell :

![image](Images/Composant_Sell.png)
