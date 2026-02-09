import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { WorksPage } from '@/pages/WorksPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trabalhos" element={<WorksPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
