import styles from "../styles/Header.module.css";
import Image from "next/image";
import etherscan from "../public/etherscan_icon.png";
import twitter from "../public/twitter_icon.png";
import opensea from "../public/opensea_icon.png";

export default function Header() {
  return (
    <nav className={styles.container}>
      <ul className={styles.icons}>
        <li>
          <a href="https://twitter.com/cryptosnowmen/status/1435122745294012416?s=21">
            <Image src={twitter} height={45} width={45} />
          </a>
        </li>
        <li>
          <a href="https://etherscan.io/address/0xd2d85d95bce7f9917e52cc5ed7d0c2126ca19bf7">
            <Image src={etherscan} height={45} width={45} />
          </a>
        </li>
        <li>
          <a href="https://opensea.io/collection/stickmentoys">
            <Image src={opensea} height={45} width={45} />
          </a>
        </li>
      </ul>
      {/* <div className={styles.title}>
          <h1>UNDERWATER CLUB</h1>
        </div> */}
      <div>
        <button className={styles.button}>CONNECT</button>
      </div>
    </nav>
  );
}
