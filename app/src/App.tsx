import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { WorksPage } from '@/pages/WorksPage';
import { GalleryPage } from '@/pages/GalleryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trabalhos" element={<WorksPage />} />
        <Route path="/galeria" element={<GalleryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
