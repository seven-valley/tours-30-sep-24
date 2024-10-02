# 9 Les routes
![module-9](../img/09/module-9.png)
```
npm i react-router-dom
```
## Ajouter une page modifier au VIP cocktail
- envoyer l id de la personne à la page modifier
- renommer la personne
- intégrer la maquette


https://reactrouter.com/en/main/components/nav-link  

https://v5.reactrouter.com/web/api/NavLink
  

# Nav.tsx
```tsx
import {Link} from 'react-router-dom';
export default function Nav() {
    return (
      <>
      <nav>
        <Link to={`/`}>Home</Link> | 
        <Link to={`/about/`}>About</Link> |
        <Link to={`/contact/`}>Contact</Link> |
      </nav>
      </>
    )  
  }
```

# About.tsx
```tsx
import Nav  from "../components/Nav.tsx";
export default function Contact() {
    return (
      <>
      <Nav></Nav>
      <h1> Contact</h1>
      </>
    )  
  }
```

# App.tsx
```tsx
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Produit from './pages/Produit'

const router = createBrowserRouter([
  {path :"/", element:<Home />},
  {path :"/about", element:<About />},
  {path :"/contact", element:<Contact />},
  {path :"/produit/:id", element:<Produit />},
])

function App() {
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
```

# Produit.tsx
```tsx
import { useParams } from "react-router-dom"
import Nav  from "../components/Nav.tsx";
export default function Produit() {
    const {id} = useParams();
    return (
    <>
    <Nav></Nav>
      <h1> Produit</h1>
      <h2>{id}</h2>
    </>
    )  
  }
  ```

  
## Correction V1 : liste objet
App.jsx
```jsx
import { useEffect, useState } from "react";

export default function App() {
  const [personnes, setPersonnes] = useState<any>({});
  const url =
    "https://sante-vip-default-rtdb.europe-west1.firebasedatabase.app/";
  const noeud = "personnes";

  const getVip = async () => {
    const url2 = url + noeud + ".json";
    const response = await fetch(url2);
    const personnes = await response.json();
    setPersonnes({ ...personnes });
  };

  useEffect(() => {
    getVip();
  }, []);

  const ajouter = async (e) => {
    e.preventDefault();
    const url2 = url + noeud + ".json";
    const p = {
      prenom: e.target.prenom.value,
      nom: e.target.nom.value,
      status: true,
    };
    const response = await fetch(url2, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(p),
    });
    const info = await response.json();

    personnes[info.name] = p;
    setPersonnes({ ...personnes });
  };
  const enlever = async (id: string) => {
    const url2 = url + noeud + "/" + id + ".json";
    const response = await fetch(url2, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    delete personnes[id];
    setPersonnes({ ...personnes });
  };
  const modifier = async (id: string) => {
    const url2 = url + noeud + "/" + id + ".json";
    const p = { status: !personnes[id].status };
    const response = await fetch(url2, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(p),
    });
    const info = await response.json();
    personnes[id].status = !personnes[id].status;
    setPersonnes({ ...personnes });
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            <i className="fa-solid fa-martini-glass-citrus me-4"></i>
            VIP Cocktail
          </a>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <div className="bg-gris p-4">
              <form method="post" onSubmit={ajouter}>
                <div className="row">
                  <div className="col-4">
                    <input
                      aria-label="Nom"
                      name="nom"
                      className="form-control"
                      placeholder="Nom"
                    />
                  </div>
                  <div className="col-4">
                    <input
                      aria-label="Prenom"
                      className="form-control"
                      name="prenom"
                      placeholder="prenom"
                    />
                  </div>
                  <div className="col-1">
                    <button className="btn btn-success">
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <table className="table table-striped mt-4">
              <tbody>
                <tr>
                  <th>Prénom</th>
                  <th>Nom</th>
                  <th colSpan={2}>Actions</th>
                </tr>

                {Object.keys(personnes).map(
                  (attribut: string, indice: number) => (
                    <tr className={personnes[attribut].status ?'table-success':'table-danger'} key={indice}>
                      <td>{personnes[attribut].prenom}</td>
                      <td>{personnes[attribut].nom}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => enlever(attribut)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                      <td>
                        <button 
                        className="btn btn-warning"
                        onClick={() => modifier(attribut)}
                        >
                          <i className="fa fa-check"></i>
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
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

## Correction V2 : liste objet => tableau
Builder.jsx
```jsx
import { useState, useEffect  } from 'react'
import '../App.css'
import Personne from '../components/Personne.jsx'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import {getGuests, addGuest, removeGuest, updateGuest} from '../services/api.js'

export default function Builder() {
  const [personnes, setPersonnes] = useState([])

  useEffect(()=>{
    recupererInvites();
  },[]);

  const recupererInvites = async () => {
    const invites = await getGuests();
    let personnesAJour = [];
    for (let id in invites)
    {
      const personne = invites[id];
      personne.id = id;
      // const p = new Personne(personne.prenom,personne.nom)
      
      personnesAJour.push(personne);
      /*
      personnesAJour.push({
        id: id,
        nom: personne.nom,
        prenom: personne.prenom,
        present: personne.present,
      });
      */
    }
    setPersonnes(personnesAJour);
  }

  const ajouterPersonne = async (e) => {
    e.preventDefault();
    
    const prenom = e.target.prenom.value;
    if (!prenom) {
      alert('Merci de renseigner un prénom svp');
      return;
    }
    const nom = e.target.nom.value;
    if (!nom) {
      alert('Merci de renseigner un nom svp');
      return;
    }

    const p = await addGuest(prenom, nom);
    personnes.push(p)
    setPersonnes([...personnes]);

    e.target.reset();
  }

  const supprimer = async (ind, id) => {
    await removeGuest(id);
    personnes.splice(ind, 1);
    setPersonnes([...personnes]);
  }

  const changerEtat = async (ind, id) => {
    await updateGuest(id, {present: !personnes[ind].present});
    personnes[ind].present = !personnes[ind].present;
    setPersonnes([...personnes]);
  }

  return (
    <>
      <Nav active='Builder' />
      <div className="container">
        <div className="row">
          <div className="col-8">
            <div className="bg-gris p-4">
              <form method="post" onSubmit={ajouterPersonne}>
                <div className="row">
                  <div className="col-4">
                    <input
                      aria-label="Prenom"
                      className="form-control"
                      placeholder="Prenom"
                      name="prenom"
                    />
                  </div>
                  <div className="col-4">
                    <input
                      aria-label="Nom"
                      className="form-control"
                      placeholder="Nom"
                      name="nom"
                    />
                  </div>
                  <div className="col-1">
                    <button className="btn btn-success" type="submit">
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          </div> 
          <div className="row">
            <div className="col-4">

              <table className="table table-striped mt-4">
                <tbody>
                  <tr>
                    <th>Prénom</th>
                    <th>Nom</th>
                    <th colSpan="3">Actions</th>
                  </tr>

                  {
                    personnes.map((p, ind) => <Personne 
                      p = {p}
                      readOnly = {false}
                      supprimer = {supprimer}
                      changerEtat = {changerEtat}
                      ind = {ind} 
                      key = {ind} 
                  />)}

                </tbody>
              </table>
          
          
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

```

*le services* 
Api.jsx 
```jsx
const url = 'https://eni-cocktail-vip-xxx-default-rtdb.europe-west1.firebasedatabase.app/';
const noeud = 'personnes';

export const getGuests = async () => {
    let url2 = url + noeud + '.json';
    const response = await axios.get(url2);
    return response.data;
}


export const getGuest = async (id) => {
    let url2 = url + noeud + '/' + id+ '.json';
    const response = await axios.get(url2)
    return response.data;
   
}

export const addGuest = async (prenom, nom) => {
    let url2 = url + noeud +'.json';
    let p = { prenom: prenom, nom: nom, present: true};
    const response = await axios.post(url2, p);
    p.id = response.data.name;
    return p;
}

export const updateGuest = async (id, data) => {
    let url2 = url + noeud+ '/'+id +'/.json' ;
    //let data = { present: true};
    await axios.patch(url2, data);
    return;
}

export const removeGuest = async (id) => {
    let url2 = url + noeud+ '/'+id +'/.json' ;
    await axios.delete(url2);
    return;
}
```