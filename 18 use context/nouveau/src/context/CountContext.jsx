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
