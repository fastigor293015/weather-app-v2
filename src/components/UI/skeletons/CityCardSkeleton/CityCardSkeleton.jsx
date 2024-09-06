import { clsx } from "../../../../utils";
import styles from "./citycardskeleton.module.css";

export const CityCardSkeleton = () => {
  return (
    <section className={styles.hero}>
      <div className={clsx("skeleton", styles.title)}></div>
      <div className={clsx("skeleton", styles.day)}></div>
      <div className={clsx("skeleton", styles.time)}></div>
      <div className={clsx("skeleton", styles.degree)}></div>
      <div className={clsx("skeleton", styles.weather)}></div>
      <div className={clsx("skeleton", styles.feeling)}></div>
    </section>
  )
}