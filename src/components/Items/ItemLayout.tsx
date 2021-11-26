import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { allItemDetails, FILTER_ITEMS } from "../../graphQL/query";
import { Items, ItemsData } from "../../graphQL/Types";
import { ItemSearch } from "./ItemSearch";
import { Item } from "./Item";

export type Filters = {
    name?: string;
    id?: number;
    brand?: string;
    priceFrom?: number;
    priceTo?: number;
    quantityFrom?: number;
    quantityTo?: number;
};
//<ItemsData, Items>
export const ItemLayout = () => {
    const [filters, setFilters] = useState<Filters>({});
    const [getItemsByFilter, { loading, data }] = useLazyQuery(FILTER_ITEMS);

    useEffect(() => {
        getItemsByFilter()
    },[])
    /* mutation eg with parameter
        const [ queryName, { error }] = useMutation(customName);

        onclick => 
        queryName({
            variables: {
                id: sjdfklj ... etc
            }
        })
    */

   const renderItems = () => {
       if(loading) return <p>Loading..</p>
       if(data) return data.getItemsByFilter.map((item:Items) => <Item item={item} />)
       return <></>
   }
    
    return (
        <div>
            <ItemSearch filters={filters} setFilters={setFilters} getItemsByFilter={getItemsByFilter} />
            {renderItems()}
        </div>
    );
};
