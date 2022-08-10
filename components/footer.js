import styles from "../styles/Footer.module.css";
import Image from "next/image";
import etherscan from "../public/etherscan_icon.png";
import twitter from "../public/twitter_icon.png";
import opensea from "../public/opensea_icon.png";

export default function Footer() {
  return (
    <nav className={styles.container}>
      <ul className={styles.icons}>
        <li>
          <a href="#">
            <Image src={twitter} height={24} width={24} />
          </a>
        </li>
        <li>
          <a href="#">
            <Image src={etherscan} height={24} width={24} />
          </a>
        </li>
        <li>
          <a href="#">
            <Image src={opensea} height={24} width={24} />
          </a>
        </li>
      </ul>
      {/* <div className={styles.title}>
          <h1>UNDERWATER CLUB</h1>
        </div> */}
      {/* <div>
        <button className={styles.button}>CONNECT</button>
      </div> */}
    </nav>
  );
}
