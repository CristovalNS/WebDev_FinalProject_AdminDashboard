import styles from "./ShipmentTracking.module.css";

const shipmentTracking = () => {
  return (
    <section className={styles.mobileHarbourHomeInner}>
      <div className={styles.frameParent}>
        <div className={styles.frameGroup}>
          <div className={styles.ellipseParent}>
            <div className={styles.frameChild} />
            <div className={styles.frameWrapper}>
              <div className={styles.fullNameParent}>
                <h3 className={styles.fullName}>Full Name</h3>
                <div className={styles.location}>Location</div>
              </div>
            </div>
          </div>
          <div className={styles.frameContainer}>
            <div className={styles.trackYourShipmentParent}>
              <div className={styles.trackYourShipment}>
                Track your shipment
              </div>
              <input
                className={styles.frameItem}
                placeholder="Resi number"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className={styles.rectangleParent}>
          <div className={styles.frameInner} />
          <div className={styles.rectangleDiv} />
        </div>
      </div>
    </section>
  );
};

export default shipmentTracking;
