# Démo Firebase
```jsx
import { useEffect, useState } from "react";
import axios from 'axios';

export default function App() {
  const url = 'https://sante-vip-default-rtdb.europe-west1.firebasedatabase.app/'
  const noeud = 'films.json';
  const ajouter=async()=>{
    const film = {nom:'STAR WARS', annee:'1977'};
    const url2 = url + noeud;
    const response = await axios.post(url2,film);
    console.log(response.data);
  }

  const lecture=async()=>{
  
    const url2 = url + noeud;
    const response = await axios.get(url2);
    console.log(response.data);
  }
  const modifier=async()=>{
    const film = {nom:'STAR WARS 2'};
    const id= '-O6eSt1XgmkHVhnKGumk';
    const url2 = url + 'films'+ '/'+id +'/.json' ;
   
    const response = await axios.patch(url2,film);
    console.log(response.data);
  }

  const enlever=async()=>{
    
    const id= '-O6eSt1XgmkHVhnKGumk';
    const url2 = url + 'films'+ '/'+id +'/.json' ;
    
    const response = await axios.delete(url2);
    console.log(response.data);
  }
  
  

  return (
    <>
      <button onClick={ajouter}> ajouter</button>
      <br /><br />
      <button onClick={lecture}> lecture</button>
      <br /><br />
      <button onClick={modifier}> modifier</button>
      <br /><br />
      <button onClick={enlever}> enlever</button>
    </>
  );
}

```


## Astuces
```jsx
let data= {
    "id1" :{"nom": "PITT", "prenom": "Brad"},
    "id2" :{"nom": "CAGE", "prenom": "Nicolas"},
    "id3" :{"nom": "JOLIE", "prenom": "Angelina"}
}
```

# Objectif
- Ajouter une personne dans Real Time data base.  
- Afficher la liste de personnnes avec useEffect au démarrage.  
- Enlever la personne de la liste. 
- Modifier l'état de la personne.  
