import { useContext, useState } from "react";
import { MainContext } from "../context/MainContext";

function ShowMessage ({message, close}) {
  const { isLoading } = useContext(MainContext);

  const [showModal, setShowModal] = useState(true);

    return(
          <>

      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-black"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
 
                {/*body*/}

                    
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {message[5]}
                  </h3>
                </div>

                <div className="p-5 border-b border-solid border-slate-200 rounded-t grid   gap-2">
                    <div>
                        <p className="flex font-bold justify-center">Sender</p> 
                        <p className="flex md:text-xl text-xs">{message[0]}</p>
                    </div>
                    <div className="">
                        <p className="flex font-bold justify-center">Receiver</p> 
                        <p className="flex md:text-xl text-xs">{message[1]}</p>
                    </div>
                </div>

                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    {message[2]}
                  </p>
                </div>

                <div className="flex justify-between items-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <div className="flex items-center space-x-2 w-full justify-center">
                    <p className="text-gray font-bold uppercase">Public? </p>
                    <input readOnly={true} id="remember" type="checkbox" checked={message[4]} className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"></input>
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={close}>
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

export default ShowMessage;