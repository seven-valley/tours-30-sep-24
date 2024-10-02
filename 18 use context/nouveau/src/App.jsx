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
