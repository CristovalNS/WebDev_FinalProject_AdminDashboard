import styles from "./RecentActivities.module.css";

const recentActivities = () => {
  return (
    <div className={styles.recentActivitiesParent}>
      <div className={styles.recentActivities}>Recent Activities</div>
      <div className={styles.rectangleParent}>
        <div className={styles.frameChild} />
        <div className={styles.frameWrapper}>
          <div className={styles.xxxXxxxxxParent}>
            <div className={styles.xxxXxxxxx}>#XXX-XXXXXX</div>
            <div className={styles.inTransitStatusX}>
              <div className={styles.status}>Status</div>
              <div className={styles.inTransit}>In transit</div>
            </div>
          </div>
        </div>
        <div className={styles.bordersContainer} />
      </div>
    </div>
  );
};

export default recentActivities;
