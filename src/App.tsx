import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { WorksPage } from '@/pages/WorksPage';
import { GalleryPage } from '@/pages/GalleryPage';
import { ThemeToggle } from '@/components/ThemeToggle';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trabalhos" element={<WorksPage />} />
          <Route path="/galeria" element={<GalleryPage />} />
        </Routes>
        <ThemeToggle />
      </div>
    </BrowserRouter>
  );
}

export default App;
