import { Items } from "../../graphQL/Types";
import { DELETE_ITEM, EDIT_ITEM } from "../../graphQL/mutation";
import { useMutation } from "@apollo/client";
import { FILTER_ITEMS } from "../../graphQL/query";
import { useState } from "react";

type Props = {
    item: Items;
};

export const Item = ({ item }: Props) => {
    const [deleteItem] = useMutation(DELETE_ITEM);
    const [editItem] = useMutation(EDIT_ITEM);
    const [isEditing, setIsEditing] = useState<Boolean>(false);
    const [editData, setEditData] = useState<Items | any>({
        modifyItemId: item.id,
        ...item,
    });

    const handleEdit = () => {
        //end editing & fire update to graphql.mutate
        setIsEditing(false);
        editItem({
            variables: { ...editData },
            refetchQueries: [{ query: FILTER_ITEMS }],
        });
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
            {/* {renderEditForm()} */}
            <div className="flex">
                <h1 className="mr-3">
                    <span className="badge mr-1">ID: </span>
                    {item.id}
                </h1>
                <h1 className="mr-3">{item.name}</h1>
                <h1 className="mr-3">
                    <span className="badge mr-1">Brand:</span>
                    {item.brand}
                </h1>
                <h1 className="mr-3">
                    <span className="badge mr-1">MYR:</span>
                    {item.price}
                </h1>
                <h1 className="mr-3">
                    <span className="badge mr-1">Quantity:</span>
                    {item.quantity}
                </h1>
            </div>

            <div className="flex">
                <button className="mr-3 p-1" onClick={() => setIsEditing(true)}>
                    Edit
                </button>
                <button className="mr-3 p-1 rounded-lg text-black bg-success">
                    ADD
                </button>
                <button className="mr-3 p-1 rounded-lg text-black bg-error">
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
