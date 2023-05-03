import React, {memo, useEffect, useState} from "react";
import Select, {SingleValue} from "react-select";
import {BackButton} from "../Components/BackButton";
import useDebounce from "../Hook/useDebounce";
import {TicketPageTestIds} from "../__test__/Fixtures";
import {IItemList} from "../interface";

const options = [
    {value: "cnb", label: "CNH/RUB"},
    {value: "eur", label: "EUR/RUB"},
    {value: "eurUsd", label: "EUR/USD"},
    {value: "usd", label: "USD/RUB"},
    {value: "try", label: "TPY/RUB"},
    {value: "byn", label: "BYN/RUB"},
];

const Ticket = ({sendMessage}: { sendMessage(ticket: IItemList): void }) => {
    const defaultInstrumentValue = options[0]
    const [amount, setAmount] = useState<string>('')
    const [instrument, setInstrument] = useState<SingleValue<typeof defaultInstrumentValue>>(defaultInstrumentValue)
    const amountValue = useDebounce(amount, 1000)

    useEffect(() => {
        setAmount(amount)
    }, [amountValue])

    const buySellHandler = (type: 'sell' | 'buy') => {
        const item: IItemList = {
            id: new Date().getTime().toString(),
            creationTime: new Date().toString(),
            changeTime: new Date().toString(),
            status: 'Filled',
            side: type,
            price: '8.559',
            amount: amount,
            instrument: instrument?.label || defaultInstrumentValue.label,
        }
        return sendMessage(item)
    }

    return (
        <div className="App gap-3">
            <span>Creat ticket</span>
            <BackButton/>
            <div className="d-flex flex-column gap-2">
                <Select defaultValue={instrument} options={options}
                        onChange={(event) => setInstrument(event)}/>
                <input
                    data-testid={TicketPageTestIds.amountInput}
                    id="amount"
                    name="amount"
                    value={amount}
                    placeholder="Amount"
                    type="text"
                    onChange={(event) => setAmount(event.target.value)}
                />
            </div>
            <div className="d-flex flex-row justify-content-around gap-3">
                <div className="d-flex flex-column">
                    <span style={{color: "white"}}>8.558</span>
                    <button data-testid={TicketPageTestIds.sellBtn} onClick={() => buySellHandler('sell')}>
                        SELL
                    </button>
                </div>
                <div className="d-flex flex-column">
                    <span style={{color: "white"}}>8.559</span>
                    <button data-testid={TicketPageTestIds.buyBtn} onClick={() => buySellHandler('buy')}>
                        BUY
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(Ticket)
