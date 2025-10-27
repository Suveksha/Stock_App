import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export default function SocketProvider({
  userId,
  children,
}: {
  userId: string;
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket: Socket = io("/socket");
    setSocket(newSocket);

    if (userId) {
      console.log("Socket Join Room", userId);
      newSocket.emit("joinRoom", userId);
    }

    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    console.log("Socket", socket);
    console.log("USERID ROOM", userId);
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext) as Socket;
