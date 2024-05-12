import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import BatchDetails from './components/BatchDetails';
import SingleBatch from './components/SingleBatch';
// import Batches from './components/batches';


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
