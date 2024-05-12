import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css'; 
import { Link } from 'react-router-dom';


const Home = () => {
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
                <th>Supplier ID</th>
                <th>Batch ID</th>
                <th>Shipment ID</th>
                <th>Weight</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Link to="/batch/:id">XXXX</Link></td>
                <td><Link to="/batch/:id">XXXX</Link></td>
                <td><Link to="/batch/:id">XXXX</Link></td>
                <td>XX kg</td>
                <td>
                  <div className="status-circles">
                    <div className="circle moss"></div>
                    <div className="connector"></div>
                    <div className="circle earth"></div>
                    <div className="connector"></div>
                    <div className="circle earth"></div>
                    <div className="connector"></div>
                    <div className="circle earth"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td><Link to="/batch/:id">XXXX</Link></td>
                <td><Link to="/batch/:id">XXXX</Link></td>
                <td><Link to="/batch/:id">XXXX</Link></td>
                <td>AA kg</td>
                <td>
                  <div className="status-circles">
                    <div className="circle moss"></div>
                    <div className="connector"></div>
                    <div className="circle earth"></div>
                    <div className="connector"></div>
                    <div className="circle earth"></div>
                    <div className="connector"></div>
                    <div className="circle earth"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td><Link to="/batch/:id">XXXX</Link></td>
                <td><Link to="/batch/:id">XXXX</Link></td>
                <td><Link to="/batch/:id">XXXX</Link></td>
                <td>BB kg</td>
                <td>
                  <div className="status-circles">
                    <div className="circle moss"></div>
                    <div className="connector"></div>
                    <div className="circle earth"></div>
                    <div className="connector"></div>
                    <div className="circle earth"></div>
                    <div className="connector"></div>
                    <div className="circle earth"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td><Link to="/batch/:id">XXXX</Link></td>
                <td><Link to="/batch/:id">XXXX</Link></td>
                <td><Link to="/batch/:id">XXXX</Link></td>
                <td>CC kg</td>
                <td>
                  <div className="status-circles">
                    <div className="circle moss"></div>
                    <div className="connector"></div>
                    <div className="circle earth"></div>
                    <div className="connector"></div>
                    <div className="circle earth"></div>
                    <div className="connector"></div>
                    <div className="circle earth"></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
