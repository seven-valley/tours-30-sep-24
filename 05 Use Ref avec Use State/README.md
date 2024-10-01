# useRef VERSUS UseState
```jsx

import { useState,useRef } from "react";

export default function App() {
  const nombre = useRef(0); //nombre.current =0
  const [valeur,setValeur]= useState<number>(0);
  const ajouterUseState =()=>{
    setValeur(valeur +1);
    console.log(valeur +1);
  }
  const ajouterUseRef=()=>{
    nombre.current = nombre.current +1;
    console.log(nombre.current)
  }
  return (
    <>
  <button onClick={ajouterUseRef}>Ajouter use Ref</button>
  <br /><br />
  <button onClick={ajouterUseState}>Ajouter use State</button>

  <h3>use Ref : {nombre.current}</h3>
  <h3>use State : {valeur}</h3>
    </>
  );
}
```

# 2 ways binding étape 1
```jsx

import { useState,useRef } from "react";

export default function App() {
  const afficher=(event)=>{
    // le nom du champ :
    console.log(event.target.name); // prenom
    console.log(event.target.value); // 'abc'
  }
  return (
    <>
      <input name="prenom"  placeholder="Votre prénom" onChange={afficher}/>
      <br /><br />
      <input name="nom"  placeholder="Votre nom" onChange={afficher}/>
    </>
  );
}
```

# 2 ways binding étape 2
```jsx

import { useState,useRef } from "react";

export default function App() {
  const [message,SetMessage]=useState<string>('');
  const prenom = useRef('');
  const nom = useRef('');
  const afficher=(event: React.ChangeEvent<HTMLInputElement>)=>{
    // le nom du champ :
    if (event.target.name =='prenom' ){
      prenom.current = event.target.value;
    }else{
      nom.current = event.target.value.toUpperCase();
    }
    SetMessage(`${prenom.current} ${nom.current}`);

  }
  return (
    <>
      <input name="prenom"  placeholder="Votre prénom" onChange={afficher}/>
      <br /><br />
      <input name="nom"  placeholder="Votre nom" onChange={afficher}/>
      <h1>{message}</h1>
    </>
  );
}

```

# 2 ways binding étape 3
```jsx
export default function App() {
  const [message,SetMessage]=useState<string>('');
  const prenom = useRef('');
  const nom = useRef('');
  const afficher=(event: React.ChangeEvent<HTMLInputElement>)=>{
    // le nom du champ :
    if (event.target.name =='prenom' ){
      prenom.current = event.target.value;
    }else{
      nom.current = event.target.value.toUpperCase();
    }
    SetMessage(`${prenom.current} ${nom.current}`);

  }
  return (
    <>
      <input name="prenom"  placeholder="Votre prénom" onChange={afficher}/>
      <br /><br />
      <input name="nom"  placeholder="Votre nom" onChange={afficher}/>
      <h1>{message}</h1>
    </>
  );
}
```