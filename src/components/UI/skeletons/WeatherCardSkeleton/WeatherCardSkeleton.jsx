import { clsx } from "../../../../utils"
import styles from "./weatherCardSkeleton.module.css";

export const WeatherCardSkeleton = () => {
  return (
    <div className={styles.item}>
      <div className={styles.top}>
        <div className={clsx("skeleton", styles.name)}></div>
        <div className={clsx("skeleton", styles.temp)}></div>
      </div>
      <div className={styles.bottom}>
        <div className={clsx("skeleton", styles.time)}></div>
        <div className={clsx("skeleton", styles.descr)}></div>
      </div>
    </div>
  )
}