import Map from "./components/Map/Map";

const App = () => {
	const { mapboxToken = "", mapboxStyle = "" } = mbwp_data || {};

	return (
		<div>
			<Map mapboxToken={mapboxToken} mapboxStyle={mapboxStyle} />
		</div>
	);
};

export default App;
