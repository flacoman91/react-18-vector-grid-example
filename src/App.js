import './App.css';
import {LeafletMap} from "./Leaflet/LeafletMap";
import {Counter} from "./features/counter/Counter";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <LeafletMap />
        <Counter />
    </div>
  );
}

export default App;
