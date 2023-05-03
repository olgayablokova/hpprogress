import React from "react";
import {Table} from "../Components/Table";
import {BackButton} from "../Components/BackButton";
import {IItemList} from "../interface";
import {Column} from "react-table";

const columns: Column<IItemList>[] = [
    {
        Header: "ID",
        accessor: "id",
    },
    {
        Header: "Creation time",
        accessor: "creationTime",
    },
    {
        Header: "Change Time",
        accessor: "changeTime",
    },
    {
        Header: "Status",
        accessor: "status",
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
        <div className="App">
            <BackButton/>
            {connected ? <Table columns={columns} data={data}/> : <div>Error connected</div>}
        </div>
    );

