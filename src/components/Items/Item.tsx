import { Items } from "../../graphQL/Types";
import { DELETE_ITEM, EDIT_ITEM, ADD_SELL_ITEM } from "../../graphQL/mutation";
import { useMutation } from "@apollo/client";
import { FILTER_ITEMS, FILTER_TRANSACTION } from "../../graphQL/query";
import { useState } from "react";

type Props = {
    item: Items;
};

type ADD_SELL = {
    types: string;
    isEditing: boolean;
};

export const Item = ({ item }: Props) => {
    //deletion
    const [deleteItem] = useMutation(DELETE_ITEM);
    //editing all data
    const [editItem] = useMutation(EDIT_ITEM);
    const [isEditing, setIsEditing] = useState<Boolean>(false);
    const [editData, setEditData] = useState<Items | any>({
        modifyItemId: item.id,
        ...item,
    });

    //add / sell item (sell involve transaction);
    const [isEditQuanti, setIsEditQuanti] = useState<ADD_SELL>({
        types: "",
        isEditing: false,
    });
    const [addSellItem] = useMutation(ADD_SELL_ITEM);
    const [itemQuantity, setItemQuantity] = useState<number>(0);

    const handleEdit = () => {
        //end editing & fire update to graphql.mutate
        setIsEditing(false);
        editItem({
            variables: { ...editData },
            refetchQueries: [{ query: FILTER_ITEMS }],
        });
    };


    const renderAddSellModal = () : React.ReactElement | JSX.Element => {
        if (isEditQuanti.isEditing) {
            return (
                <div className="absolute flex justify-center z-10 mx-auto w-full left-0 right-0 top-0">
                    <div className="modal-box bg-gray-800">
                        <div className="flex flex-col space-y-2 justify-center ">
                            <h1 className="w-full text-center mb-1">
                                Quantity to {isEditQuanti.types}:
                            </h1>
                            <span className="w-full text-center mb-2">
                                {isEditQuanti.types === "SELL" &&
                                    "(This will generate an item sell transaction)"}
                            </span>
                            <input
                                type="number"
                                className="input"
                                onChange={(e) =>
                                    setItemQuantity(
                                        isEditQuanti.types === "ADD"
                                            ? +e.target.value
                                            : -e.target.value
                                    )
                                }
                            />
                            <button
                                className="btn btn-primary"
                                onClick={() =>
                                    addSellItem({
                                        variables: {
                                            addMinusItemQuantityId: item.id,
                                            quantity: itemQuantity,
                                        },
                                        refetchQueries: [
                                            { query: FILTER_TRANSACTION },
                                        ],
                                    })
                                }
                            >
                                ADD
                            </button>
                            <button
                                className="btn"
                                onClick={() =>
                                    setIsEditQuanti({
                                        types: "",
                                        isEditing: false,
                                    })
                                }
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        return <></>
    };

    //render editing form
    if (isEditing) {
        return (
            <div className="flex justify-between bg-gray-800 text-black p-3 m-10 rounded-lg">
                <input
                    type="text"
                    placeholder="Name"
                    className="rounded-sm p-1 mx-2"
                    onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Brand"
                    className="rounded-sm p-1 mx-2"
                    onChange={(e) =>
                        setEditData({ ...editData, brand: e.target.value })
                    }
                />
                <input
                    type="number"
                    placeholder="Price"
                    className="rounded-sm p-1 mx-2"
                    onChange={(e) =>
                        setEditData({ ...editData, price: +e.target.value })
                    }
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    className="rounded-sm p-1 mx-2"
                    onChange={(e) =>
                        setEditData({ ...editData, quantity: +e.target.value })
                    }
                />
                <button className="text-white" onClick={() => handleEdit()}>
                    Done
                </button>
            </div>
        );
    }

    //render display box
    return (
        <div className="flex justify-between items-center bg-primary p-3 m-10 rounded-lg">
            {renderAddSellModal()}
            <div className="flex">
                <h1 className="mr-3">
                    <span className="badge mr-1">ID</span>
                    {item.id}
                </h1>
                <h1 className="mr-3">{item.name}</h1>
                <h1 className="mr-3">
                    <span className="badge mr-1">Brand</span>
                    {item.brand}
                </h1>
                <h1 className="mr-3">
                    <span className="badge mr-1">$</span>
                    {item.price}
                </h1>
                <h1 className="mr-3">
                    <span className="badge mr-1">Quantity</span>
                    {item.quantity}
                </h1>
            </div>

            <div className="flex">
                <button
                    id="edit-item"
                    className="btn btn-sm btn-square mr-3"
                    onClick={() => setIsEditing(true)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                </button>

                <button
                    id="add-quantity"
                    className="btn btn-sm btn-accent btn-square mr-3 text-black"
                    onClick={() =>
                        setIsEditQuanti({ types: "ADD", isEditing: true })
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
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg>
                </button>
                <button
                    id="minus-quantity"
                    className="btn btn-sm btn-error btn-square mr-3 text-black"
                    onClick={() =>
                        setIsEditQuanti({ types: "SELL", isEditing: true })
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
                            strokeWidth={2}
                            d="M18 12H6"
                        />
                    </svg>
                </button>
                <button
                    id="delete-item"
                    className="btn btn-sm btn-square"
                    onClick={() =>
                        deleteItem({
                            variables: { deleteItemId: item.id },
                            refetchQueries: [{ query: FILTER_ITEMS }],
                        })
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};
