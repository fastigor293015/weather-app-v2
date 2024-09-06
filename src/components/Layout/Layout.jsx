import { clsx } from "../../utils";
import styles from './layout.module.css';

export const Layout = ({ overflow, bgImage, children }) => {
  return <div className={clsx(styles.layout, overflow && styles.overflow)} style={{ "--main-bg-image": bgImage ? `url(${bgImage})` : "var(--background-placeholder)" }}>{children}</div>;
};
