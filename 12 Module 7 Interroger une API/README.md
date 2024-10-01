# Exemple OmdbAPI et fetc
```jsx
import { useState } from "react";

export default function App() {
 const [image,setImage] = useState('') ;
 
 const afficher1 =async ()=>{
  const key:string = 'efdc2275';
  const nom:string = 'Star Wars'
  const url:string = `http://www.omdbapi.com/?apikey=${key}&t=${nom}`; 
  const response = await fetch(url);
  const film = await response.json();
  console.log(film);
  setImage(film.Poster)
 }

 const afficher2 =async ()=>{
  const key:string = 'efdc2275';
  const nom:string = 'Star Wars'
  const url:string = `http://www.omdbapi.com/?apikey=${key}&s=${nom}`; 
  const response = await fetch(url);
  const films = await response.json();
  console.log(films);
 }
 
 const afficher3 =async ()=>{
  const key:string = 'efdc2275';
  const url:string = `http://www.omdbapi.com/?apikey=${key}&i=tt0080684`; 
  const response = await fetch(url);
  const film = await response.json();
  console.log(film);
 }
  return (
    <>
      <button onClick={afficher1}> Afficher Star Wars</button>
      {image && <img src={image} alt="st" />}
      <br />
      <button onClick={afficher2}> liste Star Wars</button>
      <br />
      <button onClick={afficher3}> Film avec ID</button>
    </>
  )
}



```

# objectif 
- afficher des series dans le moteur de recherches
- ajouter une série à la liste ( à droite) de favoris
- création Component TrFav.jsx et TrSearch.jsx

# Emmet
```
table>thead>tr>th*3 
tbody>tr*3>td*3 
 table>thead>tr>th*4^^tbody>tr*3>td*3 
```

# demo avec local storage
```jsx
import axios from 'axios';
import { useState } from 'react'


export default function App() {
  const [film, setFilm] = useState<any>({})

  const affiche=async()=>{
    const url = 'https://www.omdbapi.com/?apikey=efdc2275&t=star'
    const response = await fetch(url);
    const film2 = await response.json();
    setFilm(film2);
    
  }
  const affiche2=async()=>{
    const url = 'https://www.omdbapi.com/?apikey=efdc2275&t=star'
    const response = await axios.get(url);
    setFilm(response.data);

  }
  const stocker=()=>{
    //localStorage.fruit = 'pomme';
    localStorage.setItem('fruit','pomme');
    const tableau = ['vert','rouge','bleu'];
    console.log(JSON.stringify(tableau));
    localStorage.setItem('couleurs',JSON.stringify(tableau));
  }
 const lire=()=>{
  const info = localStorage.getItem('couleurs');
  if (info){ // null
    const couleurs = JSON.parse(info);
    console.log(couleurs);
  }
 
 }
 const effacer=()=>{
  localStorage.removeItem('couleurs');
  localStorage.clear();  
 }
  return (
    <>
      <button onClick={affiche}>1 film star wars</button>
      { film && <img src={film.Poster} width="100"/>}
      
      
      <button onClick={affiche2}>1 film star wars Axios</button>

      <button onClick={stocker}>Stocker</button>

      <button onClick={lire}>lire</button>
      
      <button onClick={effacer}>effacer</button>
    </>
  )
}
```