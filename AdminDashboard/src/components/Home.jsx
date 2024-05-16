import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css'; 
import { Link } from 'react-router-dom';


const Home = () => {
  const [batches, setBatches] = useState([]);
  const [shipments, setShipments] = useState([]);


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

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await axios.get('http://localhost:8000/shipments/');
        setShipments(response.data);
      } catch (error) {
        console.error('Failed to fetch shipments:', error);
      }
    };
  
    fetchShipments();
  }, []);
  
  
  return (
    <div className="container">
      <div className="header">PureLeaf</div>
      <div className="equal-size">
        <div className="batches-box">
          <h2>Batches</h2>
          <table className="table rounded">
            <thead>
              <tr>
                <th>Batch ID</th>
                <th>Batch Date</th>
                <th>Wet Leaves ID</th>
                <th>Dry Leaves ID</th>
                <th>Powdered Leaves ID</th>
              </tr>
            </thead>
            <tbody>
              {batches.map(batch => (
                <tr key={batch.batch_ID}>
                  <td>
                    <Link to={`/batch/${batch.batch_ID}`}>{batch.batch_ID}</Link>
                  </td>
                  <td>{batch.batch_date}</td>
                  <td>{batch.wet_leaves?.wet_weight} kg</td>
                  <td>{batch.dry_leaves?.dry_weight} kg</td>
                  <td>{batch.powdered_leaves?.powdered_weight} kg</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="equal-size">
        <div className="box">
          <h2>Notifications</h2>
          <div className="notification-item">
            <div className="notification-info">
              <span>Batch ID:</span>
              <span><Link to="/batch/:id">XXXX</Link></span>
            </div>
            <div className="notification-info">
              <span>Shipment ID:</span>
              <span><Link to="/batch/:id">XXXX</Link></span>
            </div>
            <div className="notification-info">
              <span>Supplier ID:</span>
              <span><Link to="/batch/:id">XXXX</Link></span>
            </div>
            <div className="notification-message">Any relevant message goes here</div>
          </div>
          <div className="notification-item">
            <div className="notification-info">
              <span>Batch ID:</span>
              <span><Link to="/batch/:id">XXXX</Link></span>
            </div>
            <div className="notification-info">
              <span>Shipment ID:</span>
              <span><Link to="/batch/:id">XXXX</Link></span>
            </div>
            <div className="notification-info">
              <span>Supplier ID:</span>
              <span><Link to="/batch/:id">XXXX</Link></span>
            </div>
            <div className="notification-message">Any relevant message goes here</div>
          </div>
        </div>
      </div>
      <div className="equal-size" style={{ gridColumn: "1 / -1" }}>
        {/* Spanning full width */}
        <div className="box">
  <h2>Shipments</h2>
  <table className="table rounded">
    <thead>
      <tr>
        <th>Shipment ID</th>
        <th>Batch Rescale Weight</th>
        <th>Sent Date</th>
        <th>Arrival Date</th>
        <th>Transport Status</th>
        <th>Batch ID</th>
        <th>Harbor Guard ID</th>
        <th>Harbor ID</th>
      </tr>
    </thead>
    <tbody>
      {shipments.map((shipment) => (
        <tr key={shipment.checkpoint_ID}>
          <td><Link to={`/shipment/${shipment.checkpoint_ID}`}>{shipment.checkpoint_ID}</Link></td>
          <td>{shipment.harbor_batch_rescale} kg</td>
          <td>{shipment.sent_date}</td>
          <td>{shipment.arrival_date}</td>
          <td>{shipment.transport_status}</td>
          <td>{shipment.batch_ID}</td>
          <td>{shipment.hg_user_ID}</td>
          <td>{shipment.harbor_ID}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>
    </div>
  );
};

export default Home;
