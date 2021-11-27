import { gql } from '@apollo/client';

export const FILTER_ITEMS = gql`
    query($name:String, $id:Int, $brand:String, $priceFrom:Float, $priceTo:Float,
    $quantityFrom:Int, $quantityTo:Int){
        getItemsByFilter(name: $name, id:$id, brand:$brand, priceFrom:$priceFrom, priceTo:$priceTo, quantityFrom:$quantityFrom, quantityTo:$quantityTo){
            name id brand price quantity
        }
    }
`



