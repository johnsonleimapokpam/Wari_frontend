import { useEffect, useState } from  "react";
import { getMessages } from "../services/messageServices";

export default function useMessages(conversationId){
    const [ messages, setMessages ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    
    useEffect(() => {
        if (!conversationId) return;

        const load = async () => {
            try {
                setLoading(true);

                const data = await getMessages(conversationId);
                setMessages(data.data);
            }
            catch (error){
                console.log(error)
            } finally { setLoading(false) }
        };

        load();
    },[conversationId]);

    return {
        messages,
        setMessages,
        loading
    };
}