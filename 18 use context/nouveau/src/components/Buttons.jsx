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
