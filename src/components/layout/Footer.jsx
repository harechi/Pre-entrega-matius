import styles from "../../styles/footer.module.css"
const Footer = () => {
  return (
    <footer>
      <p>© 2026 NovaMarket - Todos los derechos reservados</p>

      <div className={styles.cards}>
        <div className={styles.card}>
          <h4>Matías Etcheberry</h4>
          <p>Frontend Developer</p>
        </div>

        <div className={styles.card}>
          <h4>Jose Prieto</h4>
          <p>Backend Developer</p>
        </div>

        <div className={styles.card}>
          <h4>Monica Waisman</h4>
          <p>UX/UI Designer</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;