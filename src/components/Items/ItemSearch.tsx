import { Filters } from "./ItemLayout";

type Props = {
    filters: Filters;
    setFilters: (filters: Filters) => void;
    getItemsByFilter: (variables: any) => void;
};

export const ItemSearch = (props: Props) => {
    const { filters, setFilters, getItemsByFilter } = props;

    return (
        <div>
            <div className="p-3 bg-base-200 w-screen rounded-none ">
                <div className="flex flex-row space-x-2 justify-center items-center px-5">
                    <div>
                        <label className="label">
                            <span className="label-text">Item Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Keyboard"
                            className="input"
                            onChange={(e) =>
                                setFilters({ ...filters, name: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">ID</span>
                        </label>
                        <input
                            type="number"
                            placeholder="e.g. 100"
                            className="input"
                            onChange={(e) =>
                                setFilters({ ...filters, id: +e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Brand</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. HP"
                            className="input"
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    brand: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>

                        <input
                            type="number"
                            placeholder="Min"
                            className="input w-1/3"
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    priceFrom: +e.target.value,
                                })
                            }
                        />
                        <span className="mx-1">-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            className="input w-1/3"
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    priceTo: +e.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Quantity</span>
                        </label>

                        <input
                            type="number"
                            placeholder="Min"
                            className="input w-1/3"
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    quantityFrom: +e.target.value,
                                })
                            }
                        />
                        <span className="mx-1">-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            className="input w-1/3"
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    quantityTo: +e.target.value,
                                })
                            }
                        />
                    </div>
                    <button
                        id="search-item"
                        className="btn"
                        onClick={() =>
                            getItemsByFilter({ variables: { ...filters } })
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
        </div>
    );
};
