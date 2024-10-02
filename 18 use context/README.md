# Use context
https://openclassrooms.com/fr/courses/7150606-creez-une-application-react-complete/7256029-partagez-vos-donnees-avec-le-contexte-et-usecontext  

## CountContext.jsx
**src/context/CountContext.jsx**
```jsx
import { createContext } from "react";
import { useState } from "react";

// création du context - il sera export versles composants
export const CountContext = createContext();

// contient la logique du context - il sera export vers app.jsx pour être rendu disponible dans toute l'application
export const CountProvider = (props) => {
	// création de l'état "count" - valeur initiale à 0
	const [count, setCount] = useState(0);

	// fonction permettant d'incrémenter "count"
	const increaseCount = (value) => {
		// on utilise un callback dans le setter : un state ne doit jamais être modifié en utilisant directement sa valeur actuelle
		// le callback permet de s'assurer que React utilise la dernière valeur modifiée de l'état et prévient de certains dysfonctionnement difficiles à débuguer
		setCount((prevState) => prevState + value);
	};

	// fonction permettant de réinitialiser la valeur de "count"
	const resetCount = () => {
		setCount(0);
	};

	console.log(props.children);

	// le provider possède un "render"
	// le provider prend en props "value" un objet contenant toutes les informations à distribuer aux composents
	// ici le state "count"(vers Count.jsx) et les fonctions de modifications du state "increase"et "reset" (vers Buttons.jsx)
	return (
		<CountContext.Provider value={{ count, increaseCount, resetCount }}>
			{/* le context sera "parent" de toute l'application, mais les composants enfants ne sont pas disponibles ici alors que l'on définie son render
        on utilise "props.children" pour notifier à React que tous les composants enfants qu'il contiendra feront parti de son rendu final */}
			{props.children}
		</CountContext.Provider>
	);
};

```
## App.jsx
```jsx
import { CountProvider } from "./context/CountContext";
import Count from "./components/Count";
import Buttons from "./components/Buttons";

function App() {
	// le provider du context est utilisé comme un composant classque
	return (
		<>
			<CountProvider>
				{/* les composants enfants sont ici, 
    "props.children" permet de les intégrer au render du context défini dans un autre fichier */}
				<Count />
				<Buttons />
			</CountProvider>
		</>
	);
}

export default App;
```

## Button.jsx
```jsx
import React from "react";
import { useContext } from "react";
import { CountContext } from "../context/CountContext";

function Buttons() {
	// on récupère depuis le context les fonctions voulues
	// cf Count.jsx pour plus de détail
	const { increaseCount, resetCount } = useContext(CountContext);

	return (
		<div>
			{/* on peut appeler les fonctions du context comme n'importe qu'elle fonction maintenant */}
			<button onClick={() => increaseCount(1)}>Add 1</button>
			<button onClick={() => increaseCount(10)}>Add 10</button>
			<button onClick={resetCount}>Reset count</button>
		</div>
	);
}

export default Buttons;
```
## Count.jsx

```jsx
import React from "react";
import { useContext } from "react";
import { CountContext } from "../context/CountContext";

function Count() {
	// communication avec le context ciblé mise en place
	// seul "count" nous interresse ici
	const { count } = useContext(CountContext);

	// on écrira plutot
	// const {count} = useContext(CountContext)
	// à la place => propreté tout ça tout ça ...

	return (
		<div>
			<h1>Le compteur : </h1>
			{/* on utilise "count" de façon classique 
            le context forcera le re-render des composants abonnés si lui même doit re-render 
            (= modification d'un de ses states) */}
			<h2>{count}</h2>
		</div>
	);
}

export default Count;
```