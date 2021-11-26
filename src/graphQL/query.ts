import { gql } from '@apollo/client';

export const allItemDetails = gql`
    query{
        getAllItems{
            name id brand price quantity
        }
    }
`
