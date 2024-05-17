import styles from "./ShippingHistoryHeader.module.css";

const ShippingHistoryHeader = () => {
  return (
    <section className={styles.filterBy}>
      <div className={styles.filterBy1}>Filter by:</div>
      <div className={styles.batches}>
        <div className={styles.batchesChild} />
        <div className={styles.batchIdParent}>
          <b className={styles.batchId}>Batch ID</b>
          <div className={styles.quickRelevantInfo}>Quick relevant info</div>
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
            <i className={styles.finishOnDate}>{`Finish on: <Date>`}</i>
          </div>
        </div>
        <div className={styles.shape} />
      </div>
    </section>
  );
};

export default ShippingHistoryHeader;
