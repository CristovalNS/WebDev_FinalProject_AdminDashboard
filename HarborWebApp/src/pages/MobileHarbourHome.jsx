import { Link } from "react-router-dom";
import ShipmentTracking from "../components/ShipmentTracking";
import CurrentShipping from "../components/CurrentShipping";
import RecentActivities from "../components/RecentActivities";
import styles from "./MobileHarbourHome.module.css";

const MobileHarbourHome = () => {
  return (
    <div className={styles.mobileHarbourHome}>
      <ShipmentTracking />
      <section className={styles.mobileHarbourHomeInner}>
        <div className={styles.frameParent}>
          <CurrentShipping />
          <div className={styles.featuresParent}>
            <div className={styles.features}>Features</div>
            <div className={styles.rectangleParent}>
              <Link to="/mharbor-ongoing-shipment" className={styles.ongoingShipmentButton}>
                Ongoing Shipments
              </Link>
              <Link to="/mharbor-shipping-history" className={styles.frameItem}>
                Shipment History
              </Link>
            </div>
          </div>
          <RecentActivities />
        </div>
      </section>
      <footer className={styles.mobileHarbourHomeChild} />
    </div>
  );
};

export default MobileHarbourHome;
