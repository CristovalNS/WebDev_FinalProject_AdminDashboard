import React from 'react';
import { Link } from 'react-router-dom';
import styles from './OngoingShipmentContainer.module.css';

const ShipmentItem = ({ shipment }) => (
  <Link to={`/madmin-confirm-order/${shipment.harbor_ID}`} className={styles.rectangleParent}>
    <div className={styles.frameChild} />
    <div className={styles.shippingIdXxxxxxxxxx}>Shipment ID: {shipment.harbor_ID}</div>
    <div className={styles.fRAME}>
      <div className={styles.shippingIDLabelParent}>
        <div className={styles.shippingIDLabel} />
        <div className={styles.ongoingShipmentLabelParent}>
          <div className={styles.ongoingShipmentLabel}>
            <div className={styles.sentOnDateLabelParent}>
              <div className={styles.sentOnDateLabel}>
                <div className={styles.sentOnDateLabelChild} />
              </div>
              <div className={styles.frameItem} />
            </div>
          </div>
          <i className={styles.sentOnDate}>{`Sent on: ${shipment.sent_date}`}</i>
        </div>
      </div>
    </div>
    <div className={styles.frameInner} />
  </Link>
);

export default ShipmentItem;
