import './App.css';
import {LeafletMap} from "./Leaflet/LeafletMap";
import {Counter} from "./features/counter/Counter";
import {MapFeatures} from "./features/counter/MapFeatures";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
        <LeafletMap />
        <Counter />
        <MapFeatures/>
    </div>
  );
}

export default App;
