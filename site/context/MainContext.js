import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, ContractAddress } from "../uts/const";

export const MainContext = React.createContext();

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const Contract = new ethers.Contract(ContractAddress, contractABI, signer);
  return Contract;
};

export const MainProvider = ({ children }) => {
    const [formData, setformData] = useState({addressTo: '' , message:'', isPublic: false});
    const [currentAccount, setCurrentAccount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [inboxCounter, setInboxCounter] = useState(0);
    const [inboxMessages, setInboxMessages] = useState(); 
    const [sentsCounter, setSentsCounter] = useState(0);
    const [sentsMessages, setSentsMessages] = useState();
    const [publicMessages, setPublicMessages] = useState();  
    const [modalOpenSend, setModalOpenSend] = useState();

    const [errorModal,setErrorModal] = useState();


    const checkIfWalletIsConnect = async () => {
      try {
        if (!ethereum) return alert("Please install MetaMask.");
        
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length) {
          setCurrentAccount(accounts[0]);
          getSentsCounter();
          getInboxCounter();
        }
      } catch (error) {
        //setErrorModal(error);
      }
    };

    const connectWallet = async () => {
      try {
        if (!ethereum) return alert("Please install MetaMask.");
        const accounts = await ethereum.request({ method: "eth_requestAccounts", });
        setCurrentAccount(accounts[0]);
        window.location.reload();
        
      } catch (error) {
        setErrorModal(error);
      }
    };

    const getInboxCounter = async () => {
      try {
          const Contract = createEthereumContract();
          const InboxCounter = await Contract.InboxCounter();
          //console.log("INBOX: " + InboxCounter.toNumber());
          setInboxCounter(InboxCounter.toNumber());
      } catch (error) {
        //setErrorModal(error);
      }
    };

    const getSentsCounter = async () => {
      try {
          const Contract = createEthereumContract();
          const SentsCounter = await Contract.SentsCounter();
          setSentsCounter(SentsCounter.toNumber());
      } catch (error) {
        //setErrorModal(error);
      }
    };
  

    const getInboxMessages = async() => {
      let messages = [];
      try {
        if (ethereum) {
          setIsLoading(true);
          const Contract = createEthereumContract();
          const InboxCounter = await Contract.InboxCounter();
          //console.log(SentsCounter.toNumber())

          for (var k = 0; k < InboxCounter; k++) {
            messages.push(await Contract.ReadInbox(k));
          }
          setIsLoading(false);
        } else {
          alert("Devi accedere con Metamask");
        }
      } catch (error) {
        //setErrorModal(error);
        setIsLoading(false);
      }

      setInboxMessages(messages);
    };

    const getSentsMessages = async() => {
      let messages = [];
      try {
        if (ethereum) {
          setIsLoading(true);
          const Contract = createEthereumContract();
          const SentsCounter = await Contract.SentsCounter();

          for (var k = 0; k < SentsCounter; k++) {
            messages.push(await Contract.ReadSent(k));
          }
          setIsLoading(false);
        } else {
          alert("Devi accedere con Metamask");
        }
      } catch (error) {
        //setErrorModal(error);
        setIsLoading(false);
      }

      setSentsMessages(messages);
    };


    const getPublicMessages = async() => {
      let messages = [];
      try {
        if (ethereum) {
          setIsLoading(true);
          const Contract = createEthereumContract();
          const MessagesCounter = await Contract.MessagesCounter();

          for (var k = 0; k < MessagesCounter; k++) {
            try{
            messages.push(await Contract.ReadMessage(k));
          } catch (error) {}
          }
          setIsLoading(false);
        } else {
          alert("Devi accedere con Metamask");
        }
      } catch (error) {
        //setErrorModal(error);
        setIsLoading(false);
      }

      setPublicMessages(messages);
    };

    useEffect(() => {
      try{
        new ethers.providers.Web3Provider(window.ethereum)
        window.ethereum.on('accountsChanged', function (accounts) {
          setCurrentAccount(accounts[0]);
        })
      }catch (error){
        //setErrorModal(error)
      }
      checkIfWalletIsConnect();
      //CHECKING EVERY 5 SECONDS INCOMING MESSAGES and sents
      setInterval(async () => {
        if(currentAccount){
          //console.log(await ethereum.request({ method: "eth_accounts" })[0]);
          getInboxCounter();
          getSentsCounter();
        }
      }, 5000)
      getPublicMessages();
      //setErrorModal();
    }, []);

    useEffect(() => {
      getInboxCounter();
      getSentsCounter();
      getSentsMessages();
      getInboxMessages();
    },[currentAccount]);


  
    return (
      <MainContext.Provider
        value={{
          createEthereumContract,
          connectWallet,
          currentAccount,
          isLoading,
          formData,
          inboxCounter,
          sentsCounter,
          setformData,
          modalOpenSend,
          setModalOpenSend,
          getInboxMessages,
          getSentsMessages,
          sentsMessages,
          inboxMessages,
          setSentsCounter,
          errorModal,
          setErrorModal,
          publicMessages,
          getPublicMessages
        }}
      >
        {children}
      </MainContext.Provider>
    );
  };