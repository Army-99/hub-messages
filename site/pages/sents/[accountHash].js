import { useContext, useEffect, useState } from "react";
import ListMessages from "../../components/ListMessages";
import { MainContext } from "../../context/MainContext";


const Sents  = () => {
    const {getSentsMessages, sentsMessages} = useContext(MainContext);

    useEffect(() => {
        const init = async () => {
            await getSentsMessages();
            //console.log(sentsMessages)
        }
        init();
    },[])

    return(
        <div className="text-white w-full">
            <ListMessages messages={sentsMessages} type={"sents"}></ListMessages>
        </div>
    )
}

export default Sents;