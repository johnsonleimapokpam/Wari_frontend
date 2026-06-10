import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import { io } from "socket.io-client";

import { useAuth } from "./AuthContext";

const SocketContext =
  createContext();

export function SocketProvider({
  children
}) {

  const { token } =
    useAuth();

  const [
    socket,
    setSocket
  ] = useState(null);

  useEffect(() => {

    if (!token) return;

    const socketInstance =
      io(
        "http://localhost:5000",
        {
          auth: {
            token
          }
        }
      );
    socketInstance.onAny((event, data) => {
      console.log("SOCKET EVENT:", event);
      console.log(data);
    });
    
    setSocket(
      socketInstance
    );

    return () => {
      socketInstance.disconnect();
    };

  }, [token]);

  return (
    <SocketContext.Provider
      value={{ socket }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () =>
  useContext(SocketContext);