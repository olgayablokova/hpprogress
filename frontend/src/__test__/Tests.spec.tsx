import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WS from "jest-websocket-mock";
import {App} from "../App";
import {MemoryRouter} from "react-router-dom";
import {HomePageTestIds, TicketPageTestIds} from "./Fixtures";
import '@testing-library/jest-dom'

describe("App tickets", () => {
    let ws: WS;
    beforeEach(() => {
        ws = new WS("ws://localhost:5003/tickets");
    });
    afterEach(() => {
        WS.clean();
    });

    it("Add ticket", async () => {
        render(<MemoryRouter><App/></MemoryRouter>);
        const testValue = '987654321'
        const ticket = JSON.stringify({
            id: '1',
            creationTime: '2022-01-01 12:01:01.321531',
            changeTime: '2022-01-01 12:01:01.321531',
            status: 'Active',
            side: 'Buy',
            price: '8.559',
            amount: testValue,
            instrument: 'CNH/RUB',
        })
        await ws.connected;

        expect(screen.getByTestId(HomePageTestIds.ticketLink)).toBeInTheDocument()
        expect(screen.getByTestId(HomePageTestIds.ticketsLink)).toBeInTheDocument()

        userEvent.click(screen.getByTestId(HomePageTestIds.ticketLink))

        expect(screen.getByTestId(TicketPageTestIds.amountInput)).toBeInTheDocument()
        expect(screen.getByTestId(TicketPageTestIds.amountInput)).toHaveValue('')
        expect(screen.getByTestId(TicketPageTestIds.buyBtn)).toBeInTheDocument()
        expect(screen.getByTestId(TicketPageTestIds.sellBtn)).toBeInTheDocument()

        userEvent.type(screen.getByTestId(TicketPageTestIds.amountInput), testValue)
        expect(screen.getByTestId(TicketPageTestIds.amountInput)).toHaveValue(testValue)

        userEvent.click(screen.getByTestId(TicketPageTestIds.buyBtn))
        ws.send(ticket);

        userEvent.click(screen.getByTestId(HomePageTestIds.ticketsLink))

        expect(screen.getByText(testValue)).toBeInTheDocument()
    });

    it("Visible tickets list", async () => {
        render(<MemoryRouter><App/></MemoryRouter>);
        const testValue = '987654321'
        const ticket = JSON.stringify({
            id: '1',
            creationTime: '2022-01-01 12:01:01.321531',
            changeTime: '2022-01-01 12:01:01.321531',
            status: 'Active',
            side: 'Buy',
            price: '8.559',
            amount: testValue,
            instrument: 'CNH/RUB',
        })
        await ws.connected;
        ws.send(ticket);

        expect(screen.getByTestId(HomePageTestIds.ticketLink)).toBeInTheDocument()
        expect(screen.getByTestId(HomePageTestIds.ticketsLink)).toBeInTheDocument()

        userEvent.click(screen.getByTestId(HomePageTestIds.ticketsLink))

        expect(screen.getByText(testValue)).toBeInTheDocument()
    });
});