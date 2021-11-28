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
            <div className="flex flex-row space-x-2 justify-center items-center">
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

                <button
                    id="search-transaction"
                    className="btn"
                    onClick={() =>
                        getTransactionByFilters({ variables: { ...filters } })
                    }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};
