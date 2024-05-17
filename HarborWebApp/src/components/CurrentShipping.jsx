import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./CurrentShipping.module.css";

const CurrentShipping = () => {
  const [shipment, setShipment] = useState(null);

  useEffect(() => {
    const fetchLatestShipment = async () => {
      try {
        const response = await axios.get('http://localhost:8000/shipments/latest'); // Adjust the URL as needed
        console.log("API Response:", response.data);  // Add this line
        setShipment(response.data);
      } catch (error) {
        console.error('Failed to fetch latest shipment:', error);
      }
    };
    

    fetchLatestShipment();
  }, []);

  if (!shipment) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.frameWrapper}>
      <div className={styles.frameParent}>
        <div className={styles.currentShippingParent}>
          <div className={styles.currentShipping}>Current Shipping</div>
          <div className={styles.seeAll}>{`See all  ->`}</div>
        </div>
        <div className={styles.rectangleParent}>
          <div className={styles.frameChild} />
          <div className={styles.frameContainer}>
            <div className={styles.xxxxXxxxxParent}>
              <div className={styles.xxxxXxxxx}>Shipment ID: {shipment.checkpoint_ID}</div>
              <div className={styles.currentLocationParent}>
                <div className={styles.currentLocation}>Harbor Guard ID: {shipment.hg_user_ID}</div>
              </div>
              <div className={styles.currentLocationParent}>
                <div className={styles.currentLocation}>Batch ID: {shipment.batch_ID}</div>
              </div>
              <div className={styles.statusParent}>
                <div className={styles.status}>Status: {shipment.transport_status_description}</div>
              </div>
            </div>
          </div>
          <div className={styles.frameItem} />
        </div>
      </div>
    </div>
  );
};

export default CurrentShipping;
