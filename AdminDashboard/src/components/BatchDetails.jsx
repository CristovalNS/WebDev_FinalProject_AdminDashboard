import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';
import { Link } from 'react-router-dom';

const Batches = () => {
  const [batches, setBatches] = useState([]); 

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get('http://localhost:8000/batches/');
        setBatches(response.data); 
      } catch (error) {
        console.error('Failed to fetch batches:', error);
      }
    };

    fetchBatches();
  }, []);

  return (
    <div className="container">
      <div className="header">Batches</div>
      {batches.map((batch) => (
        <div key={batch.batch_ID} className="sand-box">
          <div className="batches-info">
            <p>Supplier: {batch.supplier_ID}</p>
            <p>Weight: {batch.weight} kg</p>
            <p>Type: {batch.type}</p>
            <p>Status: {batch.status}</p>
            <p>
              <Link to={`/batch/detail/${batch.batch_ID}`}>
                Batch ID: {batch.batch_ID}
              </Link>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Batches;
