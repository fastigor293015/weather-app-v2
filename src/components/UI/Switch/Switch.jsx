import { useTheme } from "../../../hooks/useTheme";
import { Moon } from "../icons/Moon";
import { Sun } from "../icons/Sun";
import { clsx } from "../../../utils";
import styles from "./switch.module.css";

export const Switch = ({ className }) => {
  const { theme, switchTheme } = useTheme();

  return (
    <label
      htmlFor="theme-switch"
      className={clsx(styles.label, className)}
      aria-label={`Переключиться на ${theme === "light" ? "Тёмную" : "Светлую"} тему`}
    >
      <input
        className={styles.checkbox}
        type="checkbox"
        name="theme"
        id="theme-switch"
        onChange={() => switchTheme(theme === "light" ? "dark" : "light")}
        checked={theme === "dark"}
      />
      <div className={styles.iconsContainer}>
        <Sun className={styles.sunIcon} />
        <Moon className={styles.moonIcon} />
      </div>
    </label>
  )
}