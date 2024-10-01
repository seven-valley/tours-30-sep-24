# Le BO Business Model du Use State DATA
**Data.ts**

```js
export default class Data{
    tuiles: number[]=[];
    memo:number = -1;
    indice:number = -1;
    win:number= 0;
    constructor(){}
}
```

# le component principal App.jsx
**App.jsx**
```jsx
import { useEffect, useState } from "react";
import Tuile from "./components/Tuile.tsx";
import "./App.css";
import Data from "./models/Data.ts";

export default function App() {
  const [data, setData] = useState<Data>(new Data());
  //---
  const melanger = (tab: number[]) => {
    let tab2 = [];
    for (let i = 0; i < tab.length; i++) {
      let x: number = 0;
      do {
        // je genere un nb alea de 0 à taille du tableau
        x = Math.floor(Math.random() * tab.length);
      } while (tab2[x] != undefined);
      // tant que l'emplacement n'est pas vide
      tab2[x] = tab[i];
    }
    return tab2;
  };
  //---
  useEffect(() => {
    const data = new Data();
    let tab42: number[] = []; // 42 tuiles
    for (let i = 0; i < 42; i++) {
      tab42.push(i);
    }
    tab42 = melanger(tab42);
    let tab16: number[] = tab42.splice(0, 16);
    let tab32: number[] = tab16.concat(tab16);
    tab32 = melanger(tab32);
    data.tuiles = tab32;
    setData(data);
  }, []);

  // comparer
  const comparer = (indice: number) => {
    const data2 = {...data};
    if (data2.memo == -1) {
      // 1er clique
      console.log('1er');
      data2.memo = indice; // je memo
      //data2.sel = indice;
    } else {
      // 2eme clique
      console.log('2eme');
      //data2.sel = -1;
      // verifier si mm tuile
      if (data2.tuiles[data2.memo] == data2.tuiles[indice]) {
        // je compare
        if (data2.memo != indice) {
          data2.tuiles[data2.memo] = -1;
          data2.tuiles[indice] = -1;
          data2.win = data2.win++;
        }
      }
      data2.memo =-1;
    }
    console.log(data2);
    setData(data2);
    if (data2.win == 15) {
      alert("WIN !!!!");
    }
  };

  return (
    <>
      <div className="container">
        {data.tuiles.map((t: number, indice: number) => (
          <Tuile
            key={indice}
            indice={indice}
            valeur={t}
            sel={data.memo}
            comparer={comparer}
          />
        ))}
      </div>
      <br />
      <br />
      {/* <div><button id="btnTricher">Tricher</button></div> */}
    </>
  );
}

```

# le component Tuile
**Tuile.jsx**
```jsx
interface IPropsTuile {
  indice: number;
  valeur: number;
  sel:number;
  comparer:(i:number)=> void;
}
export default function Tuile({indice,valeur,comparer,sel}:IPropsTuile) {
     return (
       <div className={sel==indice ? 'green':''}>
        {valeur != -1 &&
            <img 
            onClick={()=>comparer(indice)}
            src={`./src/assets/img/${valeur}.webp` }  width="80" />
        }
        </div> 
  )
}
```