import React from "react";
import {Column, Cell} from "react-table";
import moment from "moment/moment";

import {Table} from "../Components/Table";
import {BackButton} from "../Components/BackButton";
import {IItemList} from "../interface";

const formatDateToString = (date: Date) => {
    return moment(date).format('YYYY-MM-DD HH:MM:SS.SSS')
}

const UpperCase = ({value}:{value: string}) => {
    const res = value[0].toUpperCase() + value.slice(1)

    return <div>{ res}</div>
}

const columns: Column<IItemList>[] = [
    {
        Header: "ID",
        accessor: "id",
    },
    {
        Header: "Creation time",
        accessor: "creationTime",
        Cell: (cell: any) => <div>{formatDateToString(cell.value)}</div>,
    },
    {
        Header: "Change Time",
        accessor: "changeTime",
        Cell: (cell: any) => <div>{formatDateToString(cell.value)}</div>,
    },
    {
        Header: "Status",
        accessor: "status",
        Cell: ({cell}: {cell: {value: string}}) => <UpperCase value={cell.value}/>
    },
    {
        Header: "Side",
        accessor: "side",
    },
    {
        Header: "Price",
        accessor: "price",
    },
    {
        Header: "Amount",
        accessor: "amount",
    },
    {
        Header: "Instrument",
        accessor: "instrument",
    },
]

export const Tickets = ({data, connected}: { data: IItemList[], connected: boolean }) =>
    (
        <div className="App gap-3">
            <BackButton/>
            <div>{connected ? <Table columns={columns} data={data}/> : <div>Error connected</div>}</div>
        </div>
    );

