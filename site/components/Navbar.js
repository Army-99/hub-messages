import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/MainContext";
import Link from 'next/link';


const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const { currentAccount, connectWallet, sentsCounter, inboxCounter } = useContext(MainContext)

    return (
      <nav className="w-full flex md:justify-end justify-between items-center p-4 bg-black border-b">
        <div className="md:flex-[0.5] flex-initial justify-center items-center">
          {/*<img src={logo} alt="logo" className="w-32 cursor-pointer" />*/}
        </div>
        
        <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">

          {currentAccount && <Link href={`/`}><li className={`mx-4 cursor-pointer  hover:opacity-75 rounded-full py-2 px-7 my-2 text-lg`}>HOME</li></Link>}
          {currentAccount && <Link href={`/inbox/${currentAccount}`}><li className={`mx-4 cursor-pointer   hover:opacity-75 rounded-full py-2 px-7 my-2 text-lg`}>INBOX ({inboxCounter})</li></Link>}
          {currentAccount && <Link href={`/sents/${currentAccount}`}><li className={`mx-4 cursor-pointer  hover:opacity-75 rounded-full py-2 px-7 my-2 text-lg`}>SENTS ({sentsCounter})</li></Link>}
          {currentAccount && <Link href={`/publics`}><li className={`mx-4 cursor-pointer  hover:opacity-75 rounded-full py-2 px-7 my-2 text-lg`}>PUBLICS</li></Link>}

          {!currentAccount &&
            <button onClick={connectWallet} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-xl">
              Connect Wallet (Ropsten) 
              </span>
            </button>
          }
        </ul>
        
        
        <div className="flex relative">
          {!toggleMenu && (
            <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer hover:opacity-80" onClick={() => setToggleMenu(true)} />
          )}
         
          
          {toggleMenu && (
            <ul
              className="z-10 fixed -top-0 -right-2 p-3 w-[40vw] h-screen shadow-2xl md:hidden list-none
              flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in bg-black"
            >
                {<li className="text-xl mx-4 hover:opacity-80 cursor-pointer"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>}

                {currentAccount &&  
                  <Link href={`/`}>
                  <li className={`mx-4 cursor-pointer  hover:opacity-75 rounded-full py-2 px-7 my-2 text-lg text-center`}> HOME </li> 
                  </Link>
                }

                {currentAccount &&  
                  <Link href={`/inbox/${currentAccount}`}>
                  <li className={`mx-4 cursor-pointer   hover:opacity-75 rounded-full py-2 px-7 my-2 text-lg text-center`}> INBOX ({inboxCounter})</li> 
                  </Link>
                }
                {currentAccount &&  
                <Link href={`/sents/${currentAccount}`}> 
                  <li className={`mx-4 cursor-pointer   hover:opacity-75 rounded-full py-2 px-7 my-2 text-lg text-center`}> SENTS ({sentsCounter})</li>
                </Link>
                }
                
                {!currentAccount &&
                <button onClick={connectWallet} className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 mt-4 mr-4">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Connect Wallet (Ropsten)
                  </span>
              </button>}
            </ul>
          )}
        </div>
      </nav>
    );
  };

export default Navbar;