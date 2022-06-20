import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <div>
      <header>
        <Link to="/">amazona</Link>
      </header>
      <main>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/product/:slug" element={<ProductScreen />} />
      </Routes>
      </main>
    </div>
  );
}

export default App;
