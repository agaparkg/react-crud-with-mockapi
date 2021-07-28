import './App.css';
import Create from './components/create';
import Read from './components/read';
import Update from './components/update';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="main">
        <h2 className="main-header">React CRUD operations</h2>
        <div className="main-route">
          <Route exact path='/' component={Create} />
        </div>
        <div className="create-route">
          <Route exact path='/create' component={Create} />
        </div>
        <div className="read-route">
          <Route exact path='/read' component={Read} />
        </div>
        <div className="update-route">
          <Route exact path='/update' component={Update} />
        </div>
      </div>
    </Router>
  );
}

export default App;
