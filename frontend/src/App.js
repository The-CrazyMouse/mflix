import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import Details from './pages/Details';

function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<Details />} />
	  </Routes>
    </BrowserRouter>
  );
}

export default App;

