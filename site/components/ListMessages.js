import { useState } from "react";
import ShowMessage from "./ShowMessage";

function ListMessages ({messages, type}) {

    const [showMex, setShowMex] = useState();

    function Handler (message) {
        setShowMex(message);
    }

    function ClearMex () {
        setShowMex(null)
    }


    if(Array.isArray(messages)){
    return(
        <>
        <div className="p-5 md:lg:xl:px-40 py-20 bg-opacity-10 w-full">
                <div className="grid grid-cols-1 space-y-2">
                {
                messages.map((message,i) =>
                    <div key={i} className="p-10 text-white flex flex-col items-center text-center group space-y-2 shadow-sm shadow-slate-200">
                        <p className="mt-2 text-sm right-2 group-hover:text-xl">{new Date( message[3] * 1000).toLocaleString() }</p>
                        <p className="font-medium  mt-3 ">{message[5]}</p>

                        {type=='sents' && <p className="mt-2 md:text-xl text-xs">Destination: {message[1]}</p>}
                        {type=='inbox' && <p className="mt-2 md:text-xl text-xs ">From: {message[0]}</p>}
                        {type=='public' && 
                        <div>
                            <p className="mt-2 md:text-xl text-xs ">From: {message[0]}</p>
                            <p className="mt-2 md:text-xl text-xs">Destination: {message[1]}</p>
                        </div>}
                        

                        <button onClick={() => Handler(message)} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 
                        overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 
                        group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white 
                        dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 
                            bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-black group-hover:text-xl">
                            Read
                            </span>
                        </button>
                    </div>
                )
                }
                </div>
            {showMex && <ShowMessage message={showMex} close={ClearMex}></ShowMessage>}
        </div>
        
        </>
    )}
}

export default ListMessages;