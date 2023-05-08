const StaticMap = (props) => {
	const {
		mapboxToken = '',
		mapboxStyle = '',
		mapboxLongitude = 0,
		mapboxLatitude = 0,
		mapboxZoom = 0,
		mapboxPitch = 0,
		mapboxBearing = 0,
	} = props;

	const userStyle = mapboxStyle.replace(/^mapbox:\/\/styles\//, '');
	const imageUrl = `https://api.mapbox.com/styles/v1/${userStyle}/static/${mapboxLongitude},${mapboxLatitude},${mapboxZoom},${mapboxBearing},${mapboxPitch}/1000x1000?access_token=${mapboxToken}`;

	return (
		<div>
			<img style={{ width: '100%' }} src={imageUrl} alt="Map" />
		</div>
	);
};

export default StaticMap;
