const { render } = wp.element;
import App from './App';

if (document.getElementById('mapbox-for-wp')) {
	render(<App />, document.getElementById('mapbox-for-wp'));
}
