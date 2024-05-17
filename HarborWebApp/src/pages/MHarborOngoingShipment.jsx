import OngoingShipmentHeader from "../components/OngoingShipmentHeader";
import OngoingShipmentContainer from "../components/OngoingShipmentContainer";
import styles from "./MHarborOngoingShipment.module.css";

const MHarborOngoingShipment = () => {
  return (
    <div className={styles.mharborOngoingShipment}>
      <OngoingShipmentHeader />
      {/* <Link to="/mharbor-ongoing-shipment" className={styles.ongoingShipmentButton}></Link> */}
      <OngoingShipmentContainer ID_Data={12037137823}/>
      <footer className={styles.mainBackgroundRect} />
      <OngoingShipmentContainer ID_Data={13182031092}/>
      <OngoingShipmentContainer ID_Data={21309972373}/>
      <section className={styles.subBackgroundRect} />
    </div>
  );
};

export default MHarborOngoingShipment;
