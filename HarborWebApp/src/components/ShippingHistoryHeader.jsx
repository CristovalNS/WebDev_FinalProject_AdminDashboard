import styles from "./ShippingHistoryHeader.module.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShippingHistoryHeader = () => {
  // Initialize shipment as an object
  const [shipment, setShipment] = useState({});

  useEffect(() => {
    const fetchLatestShipment = async () => {
      try {
        const response = await axios.get('http://localhost:8000/shipments/finished'); 
        console.log("API Response:", response.data);  
        // Assuming the API returns an array and you need the first shipment
        setShipment(response.data[0] || {});
      } catch (error) {
        console.error('Failed to fetch latest shipment:', error);
      }
    };
    fetchLatestShipment();
  }, []);

  return (
    <section className={styles.filterBy}>
      <div className={styles.filterBy1}>Filter by:</div>
      <div className={styles.batches}>
        <div className={styles.batchesChild} />
        <div className={styles.batchIdParent}>
          <b className={styles.batchId}>Shipping ID: {shipment.checkpoint_ID} | Batch ID: {shipment.batch_ID}</b>
          <div className={styles.quickRelevantInfo}>Sent Date: {shipment.sent_date} </div>
          <div className={styles.quickRelevantInfo}>Arrival Date: {shipment.arrival_date}</div>
          <div className={styles.quickRelevantInfo}>Transport Status: {shipment.transport_status_description}</div>
        </div>
        <div className={styles.quickInfoLabel}>
          <div className={styles.quickInfoLabel1}>
            <div className={styles.quickInfoLabelInner}>
              <div className={styles.ellipseParent}>
                <div className={styles.frameChild} />
                <div className={styles.lineWrapper}>
                  <div className={styles.frameItem} />
                </div>
                <div className={styles.frameInner} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.shape} />
      </div>
    </section>
  );
};

export default ShippingHistoryHeader;
