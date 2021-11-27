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
        addItem({ variables: {...newItem}, refetchQueries: [{ query: FILTER_ITEMS }]})
    }

    const renderItems = () => {
        if (loading) return (
            <div className="absolute flex justify-center z-10 mx-auto w-full left-0 right-0 loading p-10">
                <span className="btn btn-lg btn-square loading"></span>
            </div>
        )
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
                            onChange={ e => setNewItem({...newItem, name: e.target.value })}
                        />
                        <input
                            type="text"
                            className="input my-1"
                            placeholder="Brand"
                            onChange={ e => setNewItem({...newItem, brand: e.target.value })}
                        />
                        <input
                            type="number"
                            className="input my-1"
                            placeholder="Price"
                            onChange={ e => setNewItem({...newItem, price: +e.target.value })}
                        />
                        <input
                            type="number"
                            className="input my-1"
                            placeholder="Quantity"
                            onChange={ e => setNewItem({...newItem, quantity: +e.target.value })}
                        />
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-primary" onClick={() => handleAddItem()}>ADD ITEM</button>
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

            <div className="flex flex-row-reverse w-screen">
                <button className="btn btn-accent m-2 text-black" onClick={() => setIsAddItem(true)}>New Item</button>
            </div>
            <div className="absolute flex justify-center z-10 mx-auto w-full left-0 right-0 ">
                {renderAddItemModal()}
            </div>

            <div className="relative w-3/4 mx-auto">{renderItems()}</div>
        </div>
    );
};
