import api from "../api/axios";

export async function getMessages(conversationId){
    const response = await api.get(`/messages/${conversationId}`);

    return response.data;
}