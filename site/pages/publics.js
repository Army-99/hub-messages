import { useContext, useEffect, useState } from "react";
import ListMessages from "../components/ListMessages";
import { MainContext } from "../context/MainContext";


const Sents  = () => {
    const {publicMessages, getPublicMessages} = useContext(MainContext);

    useEffect(() => {
        const init = async () => {
            await getPublicMessages();
            //console.log(publicMessages)
        }
        init();
    },[])

    return(
        <div className="text-white w-full">
            <ListMessages messages={publicMessages} type={"public"}></ListMessages>
        </div>
    )
}

export default Sents;