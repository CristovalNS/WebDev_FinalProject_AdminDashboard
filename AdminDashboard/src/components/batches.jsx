import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Batches = () => {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get('http://localhost:8000/batches/');
        setBatches(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchBatches();
  }, []);

  return (
    <div>
      <h1>Batches</h1>
      <ul>
        {batches.map(batch => (
          <li key={batch.batch_ID}>
            {batch.batch_ID} - {batch.dry_leaves?.dry_weight} kg - {batch.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Batches;
