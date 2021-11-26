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
                <div className="flex space-x-2 justify-center">
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
                            min={100}
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
                        onClick={() =>
                            getItemsByFilter({ variables: { ...filters } })
                        }
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};
