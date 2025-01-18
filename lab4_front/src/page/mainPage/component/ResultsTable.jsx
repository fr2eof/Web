import React from "react";
import DataTable from "react-data-table-component";

const columns = [
    {
        name: "ID",
        selector: (row) => row.id,
        sortable: true,
    },
    {
        name: "User",
        selector: (row) => row.user,
        sortable: true,
    },
    {
        name: "X",
        selector: (row) => row.x,
        sortable: true,
    },
    {
        name: "Y",
        selector: (row) => row.y,
        sortable: true,
    },
    {
        name: "R",
        selector: (row) => row.r,
        sortable: true,
    },
    {
        name: "Inside",
        selector: (row) => (row.inside ? "Yes" : "No"),
        sortable: true,
    },
];

const ResultsTable = ({data}) => {
    return (
        <DataTable
            columns={columns}
            data={data}
            pagination
            highlightOnHover
            responsive
        />
    );
};

export default ResultsTable;