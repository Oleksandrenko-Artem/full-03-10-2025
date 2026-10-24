import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SportPage from './pages/SportPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header/Header';
import CreateSportPage from './pages/CreateSportPage';
import AthletePage from './pages/AthletePage';
import CreateAthletePage from './pages/CreateAthletePage';
import AnaliticsPage from './pages/AnaliticsPage';
import Footer from './components/Footer/Footer';
import MovingShapes from './components/MovingShapes/MovingShapes';

function App() {
  return (
    <BrowserRouter>
      <MovingShapes />
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route path='/sports/:sportId' element={<SportPage />} />
        <Route path='/create-sport' element={<CreateSportPage />} />

        <Route path='/athletes/:athleteId' element={<AthletePage />} />
        <Route path='/create-athlete' element={<CreateAthletePage />} />

        <Route path='/analitics' element={<AnaliticsPage />} />

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;