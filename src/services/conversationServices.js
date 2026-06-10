import api from "../api/axios.js"

export async function getConversation(){
    const response = await api.get("/conversations");

    return response.data.data;
}