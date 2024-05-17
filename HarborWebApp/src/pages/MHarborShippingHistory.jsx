import ShippingHistoryHeader from "../components/ShippingHistoryHeader";
import ShippingHistoryBody from "../components/ShippingHistoryBody";
import styles from "./MHarborShippingHistory.module.css";
import { Link } from "react-router-dom"

const MHarborShippingHistory = () => {
  return (
    <div className={styles.mharborShippingHistory}>
      <section className={styles.frameParent}>
        <div className={styles.parent}>
          <Link to="/" className={styles.backButton}>{`<-`}</Link>
          <h3 className={styles.shippingHistory}>Shipping history</h3>
        </div>
        <input className={styles.frameChild} placeholder="Search" type="text" />
      </section>
      <ShippingHistoryHeader />
      <footer className={styles.mharborShippingHistoryChild} />
      <ShippingHistoryBody />
      <ShippingHistoryBody />
      <section className={styles.backgroundContainer} />
    </div>
  );
};

export default MHarborShippingHistory;
