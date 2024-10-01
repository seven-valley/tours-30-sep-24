# Interface Appareil
**IAppareirl.ts**
```ts
export interface IAppareil {
    name: string;
    status: boolean;
  }
```

# Business Model Appareil
**Appareil**
```ts
export class Appareil{
    constructor( public name?:string, public status:boolean=true){
    }
}
```

# App.jsx
**App.jsx**  
```tsx
import { useEffect, useState } from "react";
import { Appareil } from "./models/Appareil"
import { IAppareil } from "./interfaces/IAppareil"
import  Device from './components/Device'

export default function App() {
useEffect(()=>{
 const appareils:IAppareil[] =[
  { name: "TV 2", status: true },
  { name: "PlayStation", status: false },
  { name: "Machine à Café", status: true },
 ];
 setAppareils(appareils);
},[])
  const [appareils, setAppareils] = useState<IAppareil[]>([   
  ])
  const switchOne=(i:number)=>{
    appareils[i].status = !appareils[i].status;
    setAppareils([...appareils]);
  }
  
  const switchAll=(status:boolean)=>{
    appareils.map(a => a.status=status);
    setAppareils([...appareils]);
  }
 
const ajouter=(e: React.ChangeEvent<HTMLInputElement>)=>{
  e.preventDefault();
  const nom = e.target.appareil.value;
  e.target.reset(); 
  //const a = { name:nom, status:'allumé'};
  const a = new Appareil(nom);
  appareils.push(a);
  setAppareils([...appareils]);

}

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-4">
          <h2>Les Appareils</h2>
          <form method="post" onSubmit={ajouter}>
            <input name="appareil" className="form-control" placeholder="Appareil"/>
            <button className="btn btn-secondary my-3" type="submit"><i className="fa fa-plus"></i></button>
          </form>
          <ul className="list-group my-4">
            {
            appareils.map(
              (appareil:IAppareil,i:number)=>{
                return (
              <Device 
              key={i}  
              appareil={appareil}  indice={i} 
              switchOne={switchOne}
             
              ></Device>)
            })
            }
           
          </ul>
          <button className="btn btn-success" onClick={()=>switchAll(true)}>ALL ON</button>
          <button  className="ms-2 ml-2 btn btn-danger" onClick={()=>switchAll(false)}>ALL OFF</button>
        </div>
      </div>
    </div>
  );
}
```

# le component Device
```tsx
import { IAppareil } from "../interfaces/IAppareil";

interface IPropsDevice {
  appareil: IAppareil;
  indice: any;
  switchOne: (i: number) => void;
}

export default function Device({
 appareil,
 indice,
 switchOne
}: IPropsDevice) {
  return (
    <>
      <li
        className={`list-group-item list-group-item-${
          appareil.status 
            ? "success"
            : "danger"
        }`}
      >
        <h4>
          {appareil.name} 
        </h4>
        <button
          className={`btn  me-2 btn-${appareil.status ?'danger' :'success'}`}
          onClick={() => switchOne(indice)}
        >
          {appareil.status ? 'OFF': 'ON'}
        </button>
        
      </li>
    </>
  );
}
```

