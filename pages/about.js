import styles from '../styles/About.module.scss'

const concat = (...classNames) => classNames.join(' ');

export default function About() {
	return (
  	<>
    <h1 id="main-headline" className="glitch" data-text="About us">About us</h1>
    <p className={styles.text}>
      We are two amazing students of the higher technical college for computer science in Leonding, Austria. <br />
      As curious and ambitious students we aimed to challange ourselves by involving an AI in our thesis. <br />
      So we created a webapp that controls a virtual model based on your mimic and body movements <br />
      using your own simple webcam. 
    </p>
    <h2 className={concat(styles.text, styles.legalnoticeheadline)}>Impressum</h2>
    <p className={styles.small_legal_text}>Informationspflicht laut §5 E-Commerce Gesetz, §14 Unternehmensgesetzbuch, §63 Gewerbeordnung</p>
    <p className={styles.small_legal_text}>und Offenlegungspflicht laut §25 Mediengesetz.</p>
    <br />
    <p className={styles.legal_notice_text}>Animotion</p>
    <p className={styles.legal_notice_text}>Lasinger Christoph & Bhuiyan Romeo</p>
    <br />
    <p className={styles.legal_notice_text}>Grasbach 24</p>
    <p className={styles.legal_notice_text}>4211 Alberndorf</p>
    <br />
    <p className={styles.legal_notice_text}>animotion@gmail.com</p>
    <p className={styles.legal_notice_text}>+43 650 4423259</p>
    </>
  )
}
