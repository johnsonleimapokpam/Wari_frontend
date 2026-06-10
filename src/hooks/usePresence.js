import { useEffect, useState } from "react";
import api from "../api/axios";
import { useSocket } from "../context/SocketContext";

export default function usePresence(userId) {

  const [presence, setPresence] =  useState(null);

  const { socket } = useSocket();

  useEffect(() => {

    console.log("userId: ", userId);

    if (!userId) {
      return;
    }

    const loadPresence =
      async () => {

        const response =
          await api.get(
            `/users/${userId}/presence`
          );

        setPresence(
          response.data.data
        );
      };

    loadPresence();

  }, [userId]);

  useEffect(() => {

    if (!socket) {
      return;
    }

    const handlePresence =
      (snapshot) => {

        if (
          snapshot.userId === userId
        ) {
          setPresence(snapshot);
        }
      };

    socket.on(
      "presence_updated",
      handlePresence
    );

    socket.on(
      "user_online",
      handlePresence
    );

    socket.on(
      "user_offline",
      handlePresence
    );

    return () => {

      socket.off(
        "presence_updated",
        handlePresence
      );

      socket.off(
        "user_online",
        handlePresence
      );

      socket.off(
        "user_offline",
        handlePresence
      );
    };

  }, [socket, userId]);

  return presence;
}