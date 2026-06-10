import { useEffect, useEffectEvent, useState } from "react";
import { getConversation } from "../services/conversationServices";

export default function  useConversations(){

    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const load = async () =>{
            try{
                const data = await getConversation();
                setConversations(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        load();

    }, []);

    return { conversations, setConversations, loading, error };
}