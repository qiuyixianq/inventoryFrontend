import { gql } from '@apollo/client';

export const ADD_ITEM = gql`
    mutation($name: String!, $brand: String!, $price: Float!, $quantity:Int!){
        addItem(name: $name, brand: $brand, price: $price, quantity: $quantity){
            id name brand price quantity
        }
    }
`
export const DELETE_ITEM = gql`
    mutation($deleteItemId: Int!){
        deleteItem(id: $deleteItemId){
            id name brand price quantity
        }
    }
`

export const EDIT_ITEM = gql`
    mutation($modifyItemId: Int!, $name: String!, $brand: String!, $price: Float!, $quantity: Int!){
        modifyItem(id: $modifyItemId, name: $name, brand: $brand, price: $price, quantity: $quantity) {
            id name brand price quantity
        }
    }
`

export const ADD_SELL_ITEM = gql`
    mutation($addMinusItemQuantityId: Int!, $quantity: Int!) {
        addMinusItemQuantity(id: $addMinusItemQuantityId, quantity: $quantity) {
            id name quantity
    }
}
`