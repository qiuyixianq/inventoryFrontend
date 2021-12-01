import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Items } from "../../graphQL/Types";
import { FILTER_ITEMS } from "../../graphQL/query";
import { ADD_ITEM } from "../../graphQL/mutation";
import { Item } from "./Item";
import { ItemSearch } from "./ItemSearch";

import ReactPaginate from "react-paginate";


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
    //pagination config
    const [currentItems, setCurrentItems] = useState<Array<any>>([]);
    const [page, setPage] = useState<number>(0);
    const itemsPerPage: number = 5;

    //fetch data for the 1st time
    useEffect(() => {
        getItemsByFilter().then((res) => {
            const endOffset = itemsPerPage;
            setCurrentItems(res.data.getItemsByFilter.slice(0, endOffset));
            setPage(Math.ceil(res.data.getItemsByFilter.length / itemsPerPage));
        });
    }, [data, getItemsByFilter]);

    const onPageChange = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % data.getItemsByFilter.length;
        const newEndOffset = newOffset + itemsPerPage;
        setCurrentItems(data.getItemsByFilter.slice(newOffset, newEndOffset));
    };

    const handleAddItem = () => {
        setIsAddItem(false);
        addItem({
            variables: { ...newItem },
            refetchQueries: [{ query: FILTER_ITEMS }],
        });
    };

    const renderItems = (): React.ReactElement | JSX.Element => {
        if (loading)
            return (
                <div className="absolute flex justify-center z-10 mx-auto w-full left-0 right-0 loading p-10">
                    <span className="btn btn-lg btn-square loading"></span>
                </div>
            );
        if (currentItems.length)
            return (
                <>
                    {currentItems.map((item: Items) => (
                        <Item item={item} key={item.id} />
                    ))}
                </>
            );
        return <></>;
    };

    const renderAddItemModal = (): React.ReactElement | JSX.Element => {
        if (isAddItem)
            return (
                <div className="modal-box bg-gray-800">
                    <h1 className="text-white ml-5">Add New Item</h1>
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
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                            />
                        </svg>
                    </button>
                </div>

                {renderItems()}

                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={(e) => onPageChange(e)}
                    pageRangeDisplayed={5}
                    pageCount={page}
                    previousLabel="< previous"
                    marginPagesDisplayed={1}
                    containerClassName={`react-paginate flex w-full items-center justify-center my-10`}
                    previousLinkClassName={`btn btn-sm`}
                    nextLinkClassName={`btn btn-sm`}
                    pageLinkClassName={`btn btn-sm m-1`}
                    activeLinkClassName={`btn-primary`}
                />
            </div>
        </div>
    );
};
