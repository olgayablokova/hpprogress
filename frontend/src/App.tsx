import React, {useCallback, useEffect, useRef, useState} from "react";
import { Routes, Route, Link } from "react-router-dom";
import {useNavigate} from "react-router";

import {Tickets} from "./Page/Tickets";
import Ticket from "./Page/Ticket";

import {HomePageTestIds} from "./__test__/Fixtures";
import {IItemList} from "./interface";
import "./App.css";

export const App = () => {
  const [state, setState] = useState<IItemList[]>([])
  const [connected, setConnected] = useState<boolean>(false)
  const socket = useRef<WebSocket>()
  const navigate = useNavigate();

  const sendMessage = useCallback(async(ticket: IItemList) => {
    navigate(-1 )
    await socket.current?.send(JSON.stringify(ticket));
  }, [])

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:5003/tickets');
    socket.current.onopen = () => {
      setConnected(prevState => !prevState)
    }
    socket.current.onmessage = (mes) => {
      const value = JSON.parse(mes.data)
      setState(prevState => [...prevState, value])
    }
    socket.current.onerror = () => {
      setConnected(prevState => !prevState)
    }
    return () => {
      socket.current?.close();
    }
  }, [])

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tickets" element={<Tickets data={state} connected={connected}/>} />
        <Route path="/ticket" element={<Ticket sendMessage={sendMessage}/>} />
        <Route path="*" element={<Error />} />
      </Routes>

  );
}

const Home = () => {
  return (
      <div className="App">
        <header className="text-center">
          <nav className="d-flex gap-2">
            <Link to="ticket" data-testid={HomePageTestIds.ticketLink}>Ticket</Link>
            <Link to="tickets" data-testid={HomePageTestIds.ticketsLink}>Tickets list</Link>
          </nav>
        </header>
      </div>
  );
};

const Error = () => <div className="App text-center text-light">Oops...</div>
