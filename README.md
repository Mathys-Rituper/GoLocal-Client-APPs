# Serveurs front-end GoLocal


Installation des dépendances :
Pour installer les dépendances nécessaires au bon fonctionnement des applications web client de GoLocal. Vous aurez besoin d'avoir [Node JS](https://nodejs.org/en/) d'installé sur votre ordinateur :


Ensuite allez dans apps puis dans dans les répertoires [client-golocal](https://github.com/AlexArtaud-Dev/GoLocal-Client-APPs/tree/dev/apps/client-golocal), [vendor-golocal](https://github.com/AlexArtaud-Dev/GoLocal-Client-APPs/tree/dev/apps/vendor-golocal), [account-golocal](https://github.com/AlexArtaud-Dev/GoLocal-Client-APPs/tree/dev/apps/account-golocal)  et tapez la commande suivante : 

```bash
npm i
```

# Démarrage des serveurs :
Pour démarrer les applications web client de Go Local, aller dans les répertoires contenues dans apps [client-golocal](https://github.com/AlexArtaud-Dev/GoLocal-Client-APPs/tree/dev/apps/client-golocal), [vendor-golocal](https://github.com/AlexArtaud-Dev/GoLocal-Client-APPs/tree/dev/apps/vendor-golocal), [account-golocal](https://github.com/AlexArtaud-Dev/GoLocal-Client-APPs/tree/dev/apps/account-golocal) et tapez la commande suivante

```bash
npm run start
```

Si vous rencontrez des difficultés à définir les ports et configurations SSL des applications, il se peut que vous deviez définir manuellement les variables d'environnement modifiées dans les scripts de démarrage définis dans les fichiers package.json situés dans les trois répertoires mentionnés ci-dessus.

# Note importante

Les applications web front ne fonctionneront qu'après que les [API back](https://github.com/stupside/GoLocal/tree/dev) aient été initialisées et lancées comme indiqué dans le readme des API back GoLocal.


## Contributing
[Artaud Alexandre](https://github.com/AlexArtaud-Dev) - [Rituper Mathys](https://github.com/Mathys-Rituper) - [Cuche Valère](https://github.com/lAsDesCartes)
