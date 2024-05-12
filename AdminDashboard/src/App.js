import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BatchDetails from './pages/BatchDetails';
import SingleBatch from './pages/SingleBatch';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/batch/:id" element={<BatchDetails />} />
        <Route path="/batch/detail/:id" element={<SingleBatch />} />
      </Routes>
    </Router>
  );
}

export default App;
