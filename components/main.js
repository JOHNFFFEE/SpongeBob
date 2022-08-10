import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { abi } from "../constants/abis";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const tokens = require("../constants/tokens.json");

export const injected = new InjectedConnector();

export default function Main() {
  const [hasMetamask, setHasMetamask] = useState(false);
  const [myPrice, setmyPrice] = useState(0);
  const [myTotalSupply, setmyTotalSupply] = useState(0);
  const [isWLopen, setisWLopen] = useState(false);
  const [isPublicOpen, setisPublicOpen] = useState(false);
  const [proofs, setProof] = useState("");
  const [mintAmount, setMintAmount] = useState(1);
  const [minted, setMinted] = useState(0);
  const [toPay, settoPay] = useState(0);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const contractAddress = "0x9E6989977a9Ba9AdD47485CcD176f66EC4F86380";

  const {
    active,
    activate,
    chainId,
    account,
    accountsChanged,
    library: provider,
  } = useWeb3React();

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await activate(injected);
        setHasMetamask(true);
      } catch (e) {
        console.log(e);
      }
    }
  }

  useEffect(() => {
    if (!active) {
      toast.info(
        <a href="#" onClick={() => connect()}>
          🦊 Click here to connect to metamask
        </a>,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          // closeOnClick: true,
          // pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  }, [!active]);

  async function inWL() {
    if (active) {
      //get address wl
      let tab = [];
      tokens.map((token) => {
        tab.push(token.address);
      });
      const leaves = tab.map((addr) => keccak256(addr));
      const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const root = tree.getRoot().toString("hex");
      const leaf = keccak256(account);
      const proof = tree.getHexProof(leaf);
      console.log("root:", "0x" + root); //0x8bef28f0ac54da10614be726622f54ce02e3736d8f100ee126f3bfed268ef0ef
      console.log("proof:", proof); // true
      setProof(proof);
      setVerified(tree.verify(proof, leaf, root));
      console.log("verified?", tree.verify(proof, leaf, root)); // true
    }
  }

  useEffect(() => {
    if (active) {
      inWL();
      info();
    }
  }, [active, accountsChanged]);

  async function info() {
    if (active) {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const Price = await contract.price();
        setmyPrice(Price);
      } catch (error) {
        console.log(error);
      }

      try {
        let tots = await contract.totalSupply();
        console.log("totalSupply", tots.toString());
        setmyTotalSupply(tots.toString());
      } catch (error) {
        console.log(error);
      }

      try {
        let wlOpen = await contract.whitelistSale();
        console.log("wlOpen", wlOpen);
        setisWLopen(wlOpen);
      } catch (error) {
        console.log(error);
      }

      try {
        let puOpen = await contract.publicSale();
        console.log("puOpen", puOpen);
        setisPublicOpen(puOpen);
      } catch (error) {
        console.log(error);
      }

      try {
        let numberMinted = await contract.numberMinted(account);
        console.log("numberMinted", numberMinted.toString());

        setMinted(numberMinted.toString());
      } catch (error) {
        console.log(error);
      }

      let payableamount = 0;
      if (mintAmount === 1 && minted === 0) {
        payableamount = 0;
      } else if (minted > 0) {
        payableamount = mintAmount * myPrice;
        payableamount = payableamount.toString();
        settoPay(payableamount);
      } else {
        payableamount = (mintAmount - 1) * myPrice;
        payableamount = payableamount.toString();
      }
    } else {
      console.log("Please install MetaMask");
    }
  }

  async function mint() {
    try {
      if (active) {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        let proofTemp = [
          "0x60298f78cc0b47170ba79c10aa3851d7648bd96f2f8e46a19dbc777c36fb0c00",
        ];
        let payableamount = 0;

        if (isWLopen) {
          setLoading(true);

          console.log("wlopenes", isWLopen);
          proofTemp = proofs;
          console.log(proofTemp);
        }

        if (mintAmount === 1 && minted === 0) {
          payableamount = 0;
        } else if (minted > 0) {
          payableamount = mintAmount * myPrice;
          payableamount = payableamount.toString();
        } else {
          payableamount = (mintAmount - 1) * myPrice;
          payableamount = payableamount.toString();
        }

        let mints = await contract.mint(mintAmount, proofTemp, {
          value: payableamount,
        });

        const resolveAfter3Sec = new Promise((resolve) =>
          setTimeout(resolve, 7000)
        );
        toast.promise(resolveAfter3Sec, {
          pending: "Promise is pending",
        });

        const receipt = await mints.wait();

        toast.success("🦄 Transacation receipt!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false);
        info();

        console.log("Transacation receipt");
        console.log(receipt);
      }
    } catch (e) {
      toast.error(e.reason, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setLoading(false);

      console.log(e);
    }
  }

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
      <video autoplay="autoplay" loop muted id={styles.video} preload>
        <source src="/videofile.mp4" type="video/mp4" />
      </video>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <main className={styles.main}>
        <div className={styles.logo}>
          <Image
            src="/logo.png"
            alt="Picture of the author"
            width={436}
            height={176}
            loading="eager"
            style={{
              paddingBottom: "38px",
            }} //automatically provided
          />
        </div>
        <div className={styles.grid}>
          <div className={styles.image}>
            <Image
              src="/main.png"
              alt="Picture of the author"
              objectFit="contain"
              layout="fill" //automatically provided
              loading="eager"
            />
          </div>
          <div>
            {" "}
            {/* 2nd card */}
            <div className={styles.card}>
              {" "}
              <span className={styles.headerMsg}> MINT YOUR NFT</span>
              <div className={styles.cardheader}>
                <div className={styles.redcircle}> </div>
                <span> LIVE NOW!</span>
                {/* <button onClick={connect}>ddd</button> */}
              </div>
              <div className={styles.box}>
                <div className={styles.ImageContainer}>
                  <Image
                    src="/imgside.gif"
                    layout="fill"
                    objectFit="cover"
                    loading="eager"
                    style={{ borderRadius: "5px" }}
                  />
                </div>
                <div className={styles.cardheader2}>
                  <div className={styles.redcircle}> </div>
                  <span> LIVE NOW!</span>
                </div>

                <ul>
                  <li
                    style={{
                      fontWeight: "700",
                    }}
                  >
                    MINT {mintAmount} NFT
                  </li>
                  <li
                    style={{
                      fontWeight: "400",
                    }}
                  >
                    1 NFT free then{" "}
                    {active ? ethers.utils.formatEther(myPrice) : 0.00696} ETH
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
                <span>
                  {active
                    ? (ethers.utils.formatEther(myPrice) * (mintAmount - 1))
                        .toString()
                        .substring(0, 7)
                    : 0.00969}{" "}
                  ETH
                </span>
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
                <button
                  className={styles.rainbowbutton}
                  alt="Mint"
                  onClick={() => mint()}
                  disabled={loading}
                ></button>

                <div className={styles.footerMsg}>
                  <Image src="/anchor.png" height={19} width={19} />
                  Underwater Club is waiting for you
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2 className={styles.description}>
          {myTotalSupply <= 10000
            ? 10000 - myTotalSupply + "/10000"
            : "SOLD OUT. Visit Opensea"}
        </h2>
        <h3 className={styles.textbelow}>Left to be minted</h3>
      </main>
    </div>
  );
}
