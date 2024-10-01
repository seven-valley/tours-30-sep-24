# TP 01 le memory

Créer des tableau d'entier :  
```js
const tuiles =[1,2,3,4];
```
Créer un component :
```html
<div class="green"><img src="./img/24.webp"  width="80"></div>
```

etape 1  
 afficher les tuiles de 1 à 32
  
etape 2  
 afficher les tuiles de 1 à 32 mélangées
  
etape 3  
 afficher 16 paires de tuiles(prises parmis les 42 tuiles)  mélangées

etape 4  
effacer une tuile

etape 5   
effacer les 2 mêmes tuiles

etape 6  
éviter le bug quand on clique 2 fois sur la meme tuile

# Révision tableau
```js
    const fruits =['pomme','poire','cerise'];
    fruits.push('banane');
    for (let fruit of fruits){
        console.log(fruit);
    }
    fruits.map(fruit => {
        console.log(fruit);
    })
    for (let indice in fruits){
        console.log(fruits[parseInt(indice)]);
    }
    console.log(fruits);

    let personne ={nom:'Brad',prenom:'PITT'};
    for (let attribut in personne){
        console.log(attribut); // nom et prenom
    }
    let att = 'prenom';
    // un objet est aussi un tableau
    console.log(personne[att]);

    // effacer cerise
   // delete fruits[2];
   const indice =2;
    fruits.splice(indice,1);
    console.log(fruits);
    delete personne[att];
    console.log(personne);
    const tab = fruits.slice(0,3);
    console.log(tab);
    ```

