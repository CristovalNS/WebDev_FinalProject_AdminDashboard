import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';
import { useParams } from 'react-router-dom';

const SingleBatches = () => {
  const { batchId } = useParams();
  const [batch, setBatch] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/batches/${batchId}`);
        setBatch(response.data);
      } catch (err) {
        setError('Failed to fetch batch details');
        console.error(err);
      }
    };

    fetchBatchDetails();
  }, [batchId]);

  if (error) return <p>{error}</p>;
  if (!batch) return <p>Loading...</p>;

  return (
    <div className="single-container">
      <div className="header">Order Details</div>
      <div className="single-id-box">
        <p>Batch ID: {batch.batch_ID}</p>
      </div>
      <div className="single-info-box">
        <div className="info">
          <p>Supplier: {batch.supplier_ID}</p>
          <p>Weight: {batch.wet_leaves?.wet_weight} kg</p>
          <p>Type: {batch.type}</p>
          <p>Status: {batch.status}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleBatches;
