// SSR (Server Side Rendering) Container
// 이기웅 작성.

import ItemOrderComponent from "@/components/detail/itemorder/csr";
import axios from "axios";

export default async function DetailOrderContainer(props: any) {

    const item = props.item
    

    const itemList = await axios.get('http://localhost:4000/item/view', {
        params: { item },
    }).then((response) => {
        return response.data
    })
        .catch((error) => {
            console.error("API 호출 중 오류 발생:", error);
        })
        
    return (
        <section className='h-[700px] pt-[20px] mx-[5%]'>
            <ItemOrderComponent itemList={itemList} />
        </section>
    );
};


