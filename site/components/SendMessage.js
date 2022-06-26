import { useContext , useRef, useState } from "react";
import { MainContext } from "../context/MainContext";
import Loader from "./UI/Loader";
import Error from "./UI/Error";

const SendMessage = ()  => {
  const {formData, setformData, createEthereumContract, setSentsCounter} = useContext(MainContext);
  const [showModal, setShowModal] = useState(false);
  const [checked, setChecked] = useState(false);

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    try {
      if (ethereum) {
        setIsLoading(true);
        const { addressTo, message, isPublic} = formData;
        const Contract = createEthereumContract();
        const MessageHash = await Contract.SendMessage(addressTo, message, isPublic);

        //console.log(`Loading - ${MessageHash.hash}`);
        await MessageHash.wait();
        //console.log(`Success - ${MessageHash.hash}`);
        setIsLoading(false);

        const SentsCount = await Contract.SentsCounter();

        setSentsCounter(SentsCount.toNumber());
        //window.location.reload();
      } else {
        setError("You need to connect Wallet!");
      }
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
    
  };

  const handleChange = (e, name) => {

     //If is checkbox i'll pass the !checked state
     //console.log("CHECKER: "+ e)
    if(name === "isPublic")
      setformData((prevState) => ({ ...prevState, [name]: e })); 
    else      
      setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const { addressTo, message } = formData;
    //console.log(isPublic)
    if (!addressTo || !message) return;
    sendMessage();
  };
    
  return (
    <>
      <button onClick={() => {
        setShowModal(true);
        }} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span className="relative text-3xl px-10 py-4 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Send
                        </span>
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded-t text-black">
                  <h3 className="text-3xl font-semibold">
                    SEND
                  </h3>
                </div>
                {/*body*/}

                    {/*formData*/}
                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism text-black">
                      <input onChange={(e) => handleChange(e, "addressTo")} placeholder="Address To" type="text"  
                      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent border-none text-sm white-glassmorphism"/>
                      <textarea onChange={(e) => handleChange(e, "message")} placeholder="Enter Message" type="text"
                      className="my-2 w-full h-24 rounded-sm p-2 outline-none bg-transparent border-none text-sm white-glassmorphism "  />
                      <div className="form-check">
                        <input checked={checked}
                          onChange={() => {
                          setChecked(!checked)
                          handleChange(!checked,"isPublic")}
                          }
                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white 
                        checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 
                        align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"  
                        />
                        <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckDefault">
                          Public
                        </label>
                    </div>

                      <div className="h-[1px] w-full bg-gray-400 my-2" />

                      {isLoading
                        ? <Loader></Loader>
                        : (
                          <button
                            type="button"
                            onClick={handleSubmit}
                            className="relative w-full inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                          >
                            <span className="w-full relative text-l px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                              SEND 
                            </span>
                          </button>
                        )}
                        {error && <Error error={error}></Error>}
                      </div>

                {/*footer*/}
                <div className="flex justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 hover:opacity-80 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
    );
};

export default SendMessage;