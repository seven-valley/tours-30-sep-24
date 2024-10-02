import React from "react";
import { useContext } from "react";
import { CountContext } from "../context/CountContext";

function Count() {
	// communication avec le context ciblé mise en place
	// => const props_value_du_context = useContext(nom_du_context_auquel_on_sabonne)
	const contexteData = useContext(CountContext);
	// seul "count" nous interresse ici
	const { count } = contexteData;

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
