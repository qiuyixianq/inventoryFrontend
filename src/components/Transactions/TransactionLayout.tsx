import React, { useEffect, useState } from "react";
import { TransactionSearch } from "./TransactionSearch";
import { FILTER_TRANSACTION } from "../../graphQL/query";
import { useLazyQuery } from "@apollo/client";
import { Transactions } from "../../graphQL/Types";
import { Transaction } from "./Transaction";

export type TransFilters = {
    itemId?: number;
    brand?: string;
    dateFrom?: number | null;
    dateTo?: number | null;
};

export const TransactionLayout = () => {
    const [filters, setFilters] = useState<TransFilters>({});
    const [getTransactionByFilters, { loading, data }] =
        useLazyQuery(FILTER_TRANSACTION);

    useEffect(() => {
        getTransactionByFilters({ variables: {} });
        //eslint-disable-next-line
    }, []);

    const renderTransactions = () => {
        if (loading)
            return (
                <div className="absolute flex justify-center z-10 mx-auto w-full left-0 right-0 loading p-10">
                    <span className="btn btn-lg btn-square loading"></span>
                </div>
            );
        if (data)
            return data.getTransactionByFilter.map((trans: Transactions) => (
                <Transaction trans={trans} />
            ));
        return <></>;
    };

    return (
        <div>
            <TransactionSearch
                filters={filters}
                setFilters={setFilters}
                getTransactionByFilters={getTransactionByFilters}
            />

            <div className="relative w-3/4 mx-auto">
                
                <table className="table w-full table-zebra mt-5">
                    <thead>
                        <th>Transaction ID</th>
                        <th>Item ID</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>$</th>
                        <th>Quantity</th>
                        <th>Date</th>
                    </thead>
                    <tbody>
                        {renderTransactions()}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
