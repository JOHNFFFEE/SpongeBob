import "../styles/globals.css";

import Header from "../components/header";
// import Footer from "../components/footer";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

const getLibrary = (provider) => {
  return new Web3Provider(provider);
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...pageProps} />
        {/* <Footer /> */}
      </Web3ReactProvider>
    </>
  );
}

export default MyApp;
