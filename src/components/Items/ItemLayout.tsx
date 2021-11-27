import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FILTER_ITEMS } from "../../graphQL/query";
import { Items } from "../../graphQL/Types";
import { ItemSearch } from "./ItemSearch";
import { Item } from "./Item";
import { ADD_ITEM } from "../../graphQL/mutation";

export type Filters = {
    name?: string;
    id?: number;
    brand?: string;
    priceFrom?: number;
    priceTo?: number;
    quantityFrom?: number;
    quantityTo?: number;
};

export const ItemLayout = () => {
    //filter item
    const [filters, setFilters] = useState<Filters>({});
    const [getItemsByFilter, { loading, data }] = useLazyQuery(FILTER_ITEMS);
    //adding item
    const [addItem] = useMutation(ADD_ITEM);
    const [isAddItem, setIsAddItem] = useState<Boolean>(false);
    const [newItem, setNewItem] = useState<Items | any>();

    useEffect(() => {
        getItemsByFilter();
        //eslint-disable-next-line
    }, []);

    const handleAddItem = () => {
        setIsAddItem(false);
        addItem({
            variables: { ...newItem },
            refetchQueries: [{ query: FILTER_ITEMS }],
        });
    };

    const renderItems = () => {
        if (loading)
            return (
                <div className="absolute flex justify-center z-10 mx-auto w-full left-0 right-0 loading p-10">
                    <span className="btn btn-lg btn-square loading"></span>
                </div>
            );
        if (data)
            return data.getItemsByFilter.map((item: Items) => (
                <Item item={item} />
            ));
        return <></>;
    };

    const renderAddItemModal = () => {
        if (isAddItem)
            return (
                <div className="modal-box bg-gray-800">
                    <div className="flex flex-wrap justify-around">
                        <input
                            type="text"
                            className="input my-1"
                            placeholder="Name"
                            onChange={(e) =>
                                setNewItem({ ...newItem, name: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            className="input my-1"
                            placeholder="Brand"
                            onChange={(e) =>
                                setNewItem({
                                    ...newItem,
                                    brand: e.target.value,
                                })
                            }
                        />
                        <input
                            type="number"
                            className="input my-1"
                            placeholder="Price"
                            onChange={(e) =>
                                setNewItem({
                                    ...newItem,
                                    price: +e.target.value,
                                })
                            }
                        />
                        <input
                            type="number"
                            className="input my-1"
                            placeholder="Quantity"
                            onChange={(e) =>
                                setNewItem({
                                    ...newItem,
                                    quantity: +e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="modal-action">
                        <button
                            className="btn btn-primary"
                            onClick={() => handleAddItem()}
                        >
                            ADD ITEM
                        </button>
                        <button
                            className="btn"
                            onClick={() => setIsAddItem(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            );

        return <></>;
    };

    return (
        <div>
            <ItemSearch
                filters={filters}
                setFilters={setFilters}
                getItemsByFilter={getItemsByFilter}
            />

            <div className="absolute flex justify-center z-10 mx-auto w-full left-0 right-0 ">
                {renderAddItemModal()}
            </div>

            <div className="relative w-3/4 mx-auto">
                <div className="flex flex-row-reverse mx-10 mt-4">
                    <button
                        id="create-new-item"
                        className="btn btn-accent text-black"
                        onClick={() => setIsAddItem(true)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                            />
                        </svg>
                    </button>
                </div>
                {renderItems()}
            </div>
        </div>
    );
};
