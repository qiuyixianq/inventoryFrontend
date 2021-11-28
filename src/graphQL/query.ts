import { gql } from '@apollo/client';

export const FILTER_ITEMS = gql`
    query($name:String, $id:Int, $brand:String, $priceFrom:Float, $priceTo:Float,
    $quantityFrom:Int, $quantityTo:Int){
        getItemsByFilter(name: $name, id:$id, brand:$brand, priceFrom:$priceFrom, priceTo:$priceTo, quantityFrom:$quantityFrom, quantityTo:$quantityTo){
            name id brand price quantity
        }
    }
`

export const FILTER_TRANSACTION = gql`
    query($transId:Int, $itemId:Int, $brand: String, $dateFrom:Float, $dateTo:Float){
        getTransactionByFilter(transId: $transId, itemId: $itemId, brand: $brand, dateFrom: $dateFrom, dateTo:$dateTo) {
            transId itemId name brand price quantity date
    }
}
`

