import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import List from './components/List';
import Form from './components/Form';

function App() {
  const handleclick= function () { 
    console.log(import.meta.env);
  }
  return (
    <Router>
      <div>
        <nav>
          <ul>
          <li><Link to="/">View URLs</Link></li>
          <li><Link to="/create">Create URL</Link></li>
          </ul>
        </nav>

        <Routes>
        <Route path="/" element={<List />} />
        <Route path="/create" element={<Form />} />        
        </Routes>
        <button type="button" onClick={handleclick}></button>
      </div>
      
    </Router>
  )
}

export default App
