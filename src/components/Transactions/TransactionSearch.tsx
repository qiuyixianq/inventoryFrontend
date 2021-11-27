import React, { useState } from "react";
import { TransFilters } from "./TransactionLayout";

type Props = {
    filters: TransFilters;
    setFilters: (filters: TransFilters) => void;
    getTransactionByFilters: (variables: any) => void;
};

export const TransactionSearch = (props: Props) => {
    const { filters, setFilters, getTransactionByFilters } = props;

    return (
        <div className="p-3 bg-base-200 w-screen rounded-none">
            <div className="flex flex-row space-x-2 justify-center">
                <div>
                    <label className="label">
                        <span className="label-text">Item ID</span>
                    </label>
                    <input
                        type="number"
                        placeholder="e.g. 100"
                        className="input"
                        onChange={(e) =>
                            setFilters({ ...filters, itemId: +e.target.value })
                        }
                    />
                </div>

                <div>
                    <label className="label">
                        <span className="label-text">Item Brand</span>
                    </label>
                    <input
                        type="text"
                        placeholder="HP"
                        className="input"
                        onChange={(e) =>
                            setFilters({ ...filters, brand: e.target.value })
                        }
                    />
                </div>

                <div>
                    <label className="label">
                        <span className="label-text">From Date</span>
                    </label>
                    <input
                        type="date"
                        className="input"
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                dateFrom: e.target.valueAsNumber,
                            })
                        }
                    />
                </div>

                <div>
                    <label className="label">
                        <span className="label-text">To Date</span>
                    </label>
                    <input
                        type="date"
                        className="input"
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                dateTo: e.target.valueAsNumber,
                            })
                        }
                    />
                </div>

                <button onClick={() => getTransactionByFilters({ variables: {...filters }})}>Search</button>
            </div>
        </div>
    );
};
