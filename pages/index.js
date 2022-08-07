import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
// import gif from "../public/mint.gif";
import React, { useEffect, useState } from "react";
import { BiAnchor } from "react-icons/bi";

// import backgroundVideo from "../video/videofile.mp4";
// import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

// import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

export default function Home() {
  const [mintAmount, setMintAmount] = useState(1);

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 3) {
      newMintAmount = 3;
    }
    setMintAmount(newMintAmount);
  };

  return (
    <div className={styles.container}>
      <video autoPlay loop muted id={styles.video}>
        <source src="/videofile.mp4" type="video/mp4" />
      </video>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image
          src="/logo.png"
          alt="Picture of the author"
          width={436}
          height={176}
          style={{
            paddingBottom: "38px",
          }} //automatically provided
        />

        {/* <h2 className={styles.description}>UNDERWATER CLUB</h2> */}
        <div className={styles.grid}>
          <div className={styles.image}>
            <Image
              src="/main.png"
              alt="Picture of the author"
              width={448}
              height={543} //automatically provided
            />
          </div>
          <div>
            {" "}
            {/* 2nd card */}
            <div className={styles.card}>
              {" "}
              <span className={styles.headerMsg}> MINT YOUR NFT</span>
              <div className={styles.cardheader}>
                <div className={styles.redcircle}></div>
                <span> LIVE NOW!</span>
                {/* <p className={styles.minted}>5000/5000</p> */}
              </div>
              <div className={styles.box}>
                <Image
                  src="/imgside.gif"
                  alt="Picture of the author"
                  width={89}
                  height={89} //automatically provided
                  style={{
                    borderRadius: "5px",
                  }}
                />

                <ul>
                  <li
                    style={{
                      fontWeight: "700",
                    }}
                  >
                    MINT PHASE 1:
                  </li>
                  <li
                    style={{
                      fontWeight: "400",
                    }}
                  >
                    1 NFT free then 0.00969 ETH
                  </li>
                  <li
                    style={{
                      fontWeight: "400",
                    }}
                  >
                    <b>TOTAL SUPPLY :</b> 10000
                  </li>
                </ul>
              </div>{" "}
              <div className={styles.price}>
                <span>PRICE :</span>
                <span>0.01938 ETH</span>
              </div>
              <div className={styles.bloxBuy}>
                <ul className={styles.list}>
                  <li className={styles.left}>
                    {" "}
                    <button
                      className={styles.buttons}
                      onClick={decrementMintAmount}
                    >
                      -
                    </button>
                  </li>
                  <li className={styles.amount}>{mintAmount}</li>
                  <li className={styles.right}>
                    {" "}
                    <button
                      className={styles.buttons}
                      onClick={incrementMintAmount}
                    >
                      +
                    </button>
                  </li>
                </ul>
              </div>
              <div className={styles.minting}>
                <a href="#" className={styles.rainbowbutton} alt="Mint"></a>

                <div className={styles.footerMsg}>
                  <BiAnchor
                    color="grey"
                    fontSize="1.2rem"
                    stroke="currentColor"
                  />
                  Underwater Club is waiting for you
                </div>
                {/* <span className={styles.desc}>
                First 444 free (3 per wallet), then 0,004 eth (10 per tx)
              </span> */}
              </div>
            </div>
          </div>
        </div>
        <h2 className={styles.description}>
          {1 > 2 ? 7345 / 1000 : "SOLD OUT. Visit Opensea"}
        </h2>
        <h3 className={styles.textbelow}>Left to be minted</h3>
      </main>
    </div>
  );
}
