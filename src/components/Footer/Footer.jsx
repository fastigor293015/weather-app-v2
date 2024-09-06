import styles from './footer.module.css';

export const Footer = ({ href }) => {
  return (
    <footer className={styles.footer}>
      <div>
        Проект выполнен в рамках стажировки{' '}
        <a
          href={href ?? 'https://preax.ru'}
          target='_blank'
          rel='noreferrer'
          className={styles.footerLink}
        >
          {' '}
          PREAX{' '}
        </a>
      </div>
    </footer>
  );
};
