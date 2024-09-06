import { clsx } from "../../../utils";
import { Button } from "../Button/Button";
import styles from "./error.module.css";

export const Error = ({ className, callback, withTitle, withDescr, withBg, fontColor = "white", textAlign = "center" }) => {
  return (
    <div className={clsx(styles.container, fontColor === "black" && styles.blackFont, textAlign === "left" && styles.alignLeft, withBg && styles.withBg, className)}>
      {withTitle && <h2 className={styles.title}>Упс! Произошла ошибка</h2>}
      {withDescr && <p className={styles.descr}>Проверьте настройки и повторите попытку.</p>}
      <Button onClick={(e) => {
        e.stopPropagation();
        callback();
      }}>
        Повторить попытку
      </Button>
    </div>
  )
}