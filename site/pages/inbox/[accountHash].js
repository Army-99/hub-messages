import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/MainContext";
import ListMessages from "../../components/ListMessages";

const Inbox  = () => {
    const {getInboxMessages,inboxMessages} = useContext(MainContext);

    useEffect(() => {
        const init = async () => {
            await getInboxMessages();
            //console.log(inboxMessages)
        }
        init();
        
    },[])

    return(
            <div className="text-white w-full">
                <ListMessages messages={inboxMessages} type={"inbox"}></ListMessages>
            </div>
    )
}

export default Inbox;