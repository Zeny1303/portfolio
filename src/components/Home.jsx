import heroImage from '../assests/HeroImage.png'
import styles from './Home.module.css'

export default function Home() {
  return (
    <section className={styles.hero}>
      {/* LEFT — text */}
      <div className={styles.textCol}>
        <h1 className={styles.heading}>
          <span className={styles.line}>Curious</span>
          <span className={styles.line}>Full Stack</span>
          <span className={styles.line}>Developer</span>
        </h1>
      </div>

      {/* RIGHT — hero image */}
      <div className={styles.imageCol}>
        <img
          src={heroImage}
          alt="Sneha"
          className={styles.heroImg}
          draggable="false"
        />
      </div>
    </section>
  )
}
