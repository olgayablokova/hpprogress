import React from "react";
import {Column, useTable} from "react-table";
import {IItemList} from "../interface";

interface ITable {
    columns: Column<IItemList>[],
    data: IItemList[]
}

export const Table = ({columns, data}: ITable) => {
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
        useTable({columns, data});

    return (
        <div className="w-100" style={{overflowX: 'scroll'}}>
            <table {...getTableProps()} style={{border: "solid 1px blue"}} className="w-100">
                <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key="123">
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps()}
                                style={{
                                    borderBottom: "solid 3px red",
                                    background: "aliceblue",
                                    color: "black",
                                    fontWeight: "bold",
                                }}
                                key="123"
                            >
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} key="123">
                            {row.cells.map((cell) => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: "10px",
                                            border: "solid 1px gray",
                                            color: "black",
                                            background: "papayawhip",
                                        }}
                                        key="123"
                                    >
                                        {cell.render("Cell")}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    )
}