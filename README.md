### Firewave - Festival Mobile App
# Bienvenue dans le dépôt GitHub de Firewave, une application mobile dédiée à Firewave, un festival de rap français. Cette application est construite en React Native et permet aux utilisateurs de consulter les programmes, les artistes, les lieux et de recevoir des notifications en temps réel sur les événements.

##Table des matières
Pré-requis
Installation
Lancement de l'application
Fonctionnalités
Structure du projet
Pré-requis
Avant de pouvoir lancer l'application, assurez-vous d'avoir les éléments suivants installés sur votre machine :

Node.js version 14.x ou supérieure
npm ou yarn
React Native CLI (facultatif mais recommandé)
Android Studio (pour les utilisateurs d'Android)
Xcode (pour les utilisateurs de macOS pour le développement iOS)
Installation
Clonez le dépôt sur votre machine locale :

bash
Copier le code
git clone git@github.com:RomainConte/Back2Fest.git
cd firewave
Installez les dépendances du projet :

bash
Copier le code
npm install
# ou
yarn install
Lancement de l'application
iOS
Assurez-vous que vous avez installé les dépendances spécifiques à iOS :

bash
Copier le code
cd ios
pod install
cd ..
Pour lancer l'application sur un simulateur iOS :

bash
Copier le code
npm run ios
# ou
yarn ios
Android
Pour lancer l'application sur un émulateur Android :

bash
Copier le code
npm run android
# ou
yarn android
Fonctionnalités
Programme du festival : Consultez les horaires des événements et des performances.
Artistes : Découvrez les artistes présents au festival.
Lieux : Localisez les différentes scènes et points d'intérêt du festival.
Notifications : Recevez des notifications en temps réel sur les événements à venir.
Billetterie : Achetez vos billets directement depuis l'application.
Structure du projet
Voici un aperçu de la structure du projet :

bash
Copier le code
firewave/
├── android/          # Fichiers spécifiques à Android
├── ios/              # Fichiers spécifiques à iOS
├── src/              # Code source de l'application
│   ├── components/   # Composants réutilisables
│   ├── screens/      # Différentes pages/écrans de l'application
│   ├── navigation/   # Configuration de la navigation
│   ├── assets/       # Ressources (images, polices, etc.)
│   └── services/     # Services (API, notifications, etc.)
├── App.js            # Point d'entrée de l'application
├── package.json      # Dépendances et scripts de l'application
└── README.md         # Documentation du projet

# Cette application mobile a été créer par la team coco, réalisant également le site internet de Firewave ainsi que leur poubelle connecté, à retrouver sur le site coco

Merci d'utiliser Firewave ! Nous espérons que vous apprécierez votre festival. Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue ou à nous contacter.
