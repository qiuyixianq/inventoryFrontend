import { Items } from '../../graphQL/Types';

type Props = {
    item: Items
}

export const Item = ({item}: Props) => {


    return (
        <div>
            <h1>{item.name}</h1>
            
        </div>
    )
}