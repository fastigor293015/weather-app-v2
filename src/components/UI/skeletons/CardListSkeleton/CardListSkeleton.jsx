import { CardSkeleton } from "./CardSkeleton/CardSkeleton"
import styles from "./cardlistskeleton.module.css";

export const CardListSkeleton = () => {
  return (
    <section className={styles.cardList}>
      {Array.from({ length: 6 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </section>
  )
}