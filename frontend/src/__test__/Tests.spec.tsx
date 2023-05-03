import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WS from "jest-websocket-mock";
import {App} from "../App";
import {MemoryRouter} from "react-router-dom";
import {HomePageTestIds} from "./Fixtures";

let ws: WS;
beforeEach(() => {
    ws = new WS("ws://localhost:5003");
});
afterEach(() => {
    WS.clean();
});

describe("App tickets", () => {
    it("Add ticket", async () => {
        render(<MemoryRouter><App/></MemoryRouter>);
        const ticket = JSON.stringify({
            id: '1',
            creationTime: '2022-01-01 12:01:01.321531',
            changeTime: '2022-01-01 12:01:01.321531',
            status: 'Active',
            side: 'Buy',
            price: '8.559',
            amount: '987654321',
            instrument: 'CNH/RUB',
        })
        await ws.connected;
        await ws.send(ticket);
        userEvent.click(screen.getByTestId(HomePageTestIds.ticketsLink))

        expect(screen.getByText("987654321")).toBeInTheDocument();
    });
});