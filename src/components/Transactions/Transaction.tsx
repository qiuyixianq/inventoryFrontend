import { Transactions } from '../../graphQL/Types'

type Props = {
    trans: Transactions
}

export const Transaction = ({trans} : Props) => {

    const unserialDate = ():string => {
        const date = new Date(trans.date).toDateString();
        return date;
    }

    return (
        <tr>
            <td>{trans.transId}</td>
            <td>{trans.itemId}</td>
            <td>{trans.name}</td>
            <td>{trans.brand}</td>
            <td>{trans.price}</td>
            <td>{trans.quantity}</td>
            <td>{unserialDate()}</td>
        </tr>
    )
}