// SSR (Server Side Rendering) Container
// 이기웅 작성.

import ItemOrderComponent from "@/components/detail/itemorder/csr";
import axios from "axios";

async function itemData(item: string) {
    const res = await axios.get('http://localhost:4000/item/view', {
        params: { item },
    })
    return res.data
}
export default async function DetailOrderContainer(props: any) {
    const item = props.item
    const itemList = await itemData(item)    

    return (
        <section className='h-[700px] pt-[20px] mx-[15%]'>
            <ItemOrderComponent itemList={itemList} />
        </section>
    );
};


