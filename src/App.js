import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// import custom components
import NavbarMain from './components/NavbarMain';
import Reading from './pages/Reading';
import Writing from './pages/Writing';

function App() {
  return (
    <Router>
      <div>
        <NavbarMain />
        <Routes>
          <Route path='/' element={<Reading/>} />
          <Route path='/litspace' element={<Reading/>} />
          <Route path='/reading' element={<Reading/>} />
          <Route path='/writing' element={<Writing/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
