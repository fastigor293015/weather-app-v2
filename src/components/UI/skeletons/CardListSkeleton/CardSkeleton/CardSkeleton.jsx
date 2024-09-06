import { clsx } from "../../../../../utils";
import styles from "./cardskeleton.module.css";

export const CardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={clsx("skeleton", styles.title)}></div>
      <div className={clsx("skeleton", styles.icon)}></div>
      <div className={clsx("skeleton", styles.value)}></div>
      <div className={clsx("skeleton", styles.descr)}></div>
    </div>
  )
}