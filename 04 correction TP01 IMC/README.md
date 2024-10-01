# Correction V1
```tsx
//import {React} from 'react';
import { useState } from 'react';
import './App.css'
interface Iinfo{
  imc:string;
  tranche:string;
  classe:string;
  kilo:string;
  kilo:string;
  poids:string;

}
export default function App() {
 //let message = 'Bonjour';
 const [info,setInfo]= useState<Iinfo>({
  imc:'',
  tranche:'',
  classe:'',
  kilo:'',
  poids:''
 });
  const calcul =(event: React.ChangeEvent<HTMLInputElement>)=>{
    event.preventDefault();
    const poids:string = event.target.poids.value;
    const taille:string = event.target.taille.value;
    event.target.reset(); // vider champ input
    const imc:number = parseFloat(poids) / (parseFloat(taille)* parseFloat(taille))
    let info:Iinfo ={
      imc:'',
      tranche:'',
      classe:'',
      kilo:'',
      poids:''
     };
     if (imc > 25){
      const poidsIdeal:number = 25 * parseFloat(taille) *  parseFloat(taille);
      const kilo:number = poidsIdeal - parseFloat(poids);
      info.kilo = kilo.toFixed(1);
      info.poids = poidsIdeal.toFixed(1);
    }
     info.imc = imc.toFixed(1);
    if ( imc <18.5){
      const poidsIdeal = 18.5 * parseFloat(taille) *  parseFloat(taille);
      info.tranche = 'maigreur';
      const kilo:number = poidsIdeal - parseFloat(poids);
      //info.kilo = '+'+kilo.toFixed(1);
      info.kilo = `+ ${kilo.toFixed(1)}`;
      info.poids = poidsIdeal.toFixed(1);
    }
    else if (imc <25){ // 18.5 <imc <25
      info.tranche = 'normal';
    }
    else if (imc <30){ 
      info.tranche = 'surpoids';
    }
    else if (imc <35){ 
      info.tranche = 'obésité';
    }
    else if (imc <40){ 
      info.tranche = 'obésité massive';
    }
    else if (imc >=40){ 
      info.tranche = 'obésité sévère';
    }
    console.log(info);
    setInfo(info);
  }
  return (
    <>
    <form method="post" onSubmit={calcul}>
      <input name="poids" 
      defaultValue="80" 
      placeholder="Poids en kg." />
      <br /><br />
      <input 
      name="taille" 
      placeholder="Taille en mètre" defaultValue="1.8"  />
      <br /><br />
      <button type="submit"  className="btn btn-success"><i className="fa fa-plus"></i></button>
     { info.imc.length > 0  &&
     <>
     <h1>IMC :{info.imc}</h1>
     <h2>tranche :{info.tranche}</h2>
     { info.kilo.length > 0 && 
     <h3>objectif :{info.poids} kg ({info.kilo})</h3>
      }
     </>
    }
    </form>
   
    </>
  )
}

```

# Version 2
```jsx
//import {React} from 'react';
import { useState } from "react";
import "./App.css";
interface Iinfo {
  imc: string;
  tranche: string;
  classe: string;
  kilo: string;
  kilo: string;
  poids: string;
}
export default function App() {
  //let message = 'Bonjour';
  const [info, setInfo] = useState<Iinfo>({
    imc: "",
    tranche: "",
    classe: "",
    kilo: "",
    poids: "",
  });
  const calcul = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const poids: string = event.target.poids.value;
    const taille: string = event.target.taille.value;
    event.target.reset(); // vider champ input
    const imc: number =
      parseFloat(poids) / (parseFloat(taille) * parseFloat(taille));
    let info: Iinfo = {
      imc: "",
      tranche: "",
      classe: "",
      kilo: "",
      poids: "",
    };
    if (imc > 25) {
      const poidsIdeal: number = 25 * parseFloat(taille) * parseFloat(taille);
      const kilo: number = poidsIdeal - parseFloat(poids);
      info.kilo = kilo.toFixed(1);
      info.poids = poidsIdeal.toFixed(1);
    }
    info.imc = imc.toFixed(1);
    if (imc < 18.5) {
      const poidsIdeal = 18.5 * parseFloat(taille) * parseFloat(taille);
      info.tranche = "maigreur";
      const kilo: number = poidsIdeal - parseFloat(poids);
      //info.kilo = '+'+kilo.toFixed(1);
      info.kilo = `+ ${kilo.toFixed(1)}`;
      info.poids = poidsIdeal.toFixed(1);
      info.classe='warning';
    } else if (imc < 25) {
      // 18.5 <imc <25
      info.tranche = "normal";
      info.classe='success';
    } else if (imc < 30) {
      info.tranche = "surpoids";
      info.classe='warning';
    } else if (imc < 35) {
      info.tranche = "obésité";
      info.classe='danger';
    } else if (imc < 40) {
      info.tranche = "obésité massive";
      info.classe='secondary';
    } else if (imc >= 40) {
      info.tranche = "obésité sévère";
      info.classe='info';
    }
    console.log(info);
    setInfo(info);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            <i className="fa-solid fa-weight-scale"></i>
            Calcul IMC
          </a>
        </div>
      </nav>
      <div className="container">
      <form method="post" onSubmit={calcul}>
        <div className="row">
          <div className="col-4 pt-4">
            <h1 className="h3">Calculer votre IMC</h1>
            <input
              aria-label="Poids"
              className="form-control"
              placeholder="Poids en kg."
              name="poids"
            />

            <input
              aria-label="Taille"
              className="form-control mt-3"
              placeholder="taille en m."
               name="taille"
            />

            <button className="btn btn-success my-3 col-12" type="submit">
              <i className="fa-solid fa-weight-scale"></i>
            </button>
            {info.imc.length > 0 && (
          <>
           <div className={`alert mt-4 alert-${info.classe}`} role="alert">
              <h3>IMC : {info.imc}</h3>
              <p>{info.tranche}</p>
              {info.kilo.length > 0 && (
              <h4>
                objectif :{info.poids} kg ({info.kilo})
              </h4>
            )}
            </div>

           
          </>
        )}
           

          </div>
        </div>
        </form>
      </div>

      <footer className="py-5 bg-dark">
        <div className="container px-4 px-lg-5">
          <p className="m-0 text-center text-white">
            Copyright &copy; Seven Valley 2023
          </p>
        </div>
      </footer>
    </>
  );
}

```