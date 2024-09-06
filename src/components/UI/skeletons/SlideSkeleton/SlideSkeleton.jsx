import { clsx } from "../../../../utils";
import styles from "./slideskeleton.module.css";

export const SlideSkeleton = () => {
  return (
    <li className={styles.slide}>
      <div className={clsx("skeleton", styles.text)}></div>
      <div className={clsx("skeleton", styles.icon)}></div>
      <div className={clsx("skeleton", styles.text)}></div>
    </li>
  )
}