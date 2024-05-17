import React from "react";
import { Link } from "react-router-dom";
import styles from "./OngoingShipmentHeader.module.css";

const OngoingShipmentHeader = () => {
  return (
    <section className={styles.frameParent}>
      <div className={styles.parent}>
        <Link to="/" className={styles.backButton}>{`<-`}</Link>
        <div className={styles.ongoingShipmentWrapper}>
          <h3 className={styles.ongoingShipment}>Ongoing Shipment</h3>
        </div>
      </div>
      <input className={styles.frameChild} placeholder="Search" type="text" />
    </section>
  );
};

export default OngoingShipmentHeader;
