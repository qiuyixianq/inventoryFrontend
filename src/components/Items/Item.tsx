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
    const [editData, setEditData] = useState<Items | any>({modifyItemId: item.id,...item,});
    
    //add / sell item (sell involve transaction);
    const [isEditQuanti, setIsEditQuanti] = useState<ADD_SELL>({types: "",isEditing: false,});
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

    const renderAddSellModal = () => {
        
        if (isEditQuanti.isEditing) {
            return (
                <div className="absolute flex justify-center z-10 mx-auto w-full left-0 right-0 top-0">
                    <div className="modal-box bg-gray-800">
                        <div className="flex flex-col space-y-2 justify-center ">
                            <h1 className='w-full text-center mb-2'>Quantity to {isEditQuanti.types}:</h1>
                            <input type="number" className="input" onChange={ e => setItemQuantity(isEditQuanti.types === 'ADD'? +e.target.value : -e.target.value) } />
                            <button className="btn btn-primary" onClick={() => addSellItem({variables: { addMinusItemQuantityId: item.id, quantity: itemQuantity },refetchQueries: [{ query: FILTER_TRANSACTION }]}) }>ADD</button>
                            <button className="btn" onClick={() => setIsEditQuanti({types: '', isEditing: false})}>Cancel</button>
                        </div>
                    </div>
                </div>
            );
        }
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
        <div className="flex justify-between bg-primary p-3 m-10 rounded-lg">
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
                <button className="mr-3 p-1" onClick={() => setIsEditing(true)}>
                    Edit
                </button>
                <button
                    className="mr-3 p-1 rounded-lg text-black bg-success"
                    onClick={() =>
                        setIsEditQuanti({ types: "ADD", isEditing: true })
                    }
                >
                    ADD
                </button>
                <button
                    className="mr-3 p-1 rounded-lg text-black bg-error"
                    onClick={() =>
                        setIsEditQuanti({ types: "SELL", isEditing: true })
                    }
                >
                    SELL
                </button>
                <button
                    className="mr-3 p-1 "
                    onClick={() =>
                        deleteItem({
                            variables: { deleteItemId: item.id },
                            refetchQueries: [{ query: FILTER_ITEMS }],
                        })
                    }
                >
                    DELETE
                </button>
            </div>
        </div>
    );
};
