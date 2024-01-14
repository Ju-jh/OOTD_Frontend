// SSR (Server Side Rendering) Container
// 이기웅 작성.

import ItemGuideComponent from "@/components/detail/itemguide/csr";
import ItemReviewComponent from "@/components/detail/itemreview/csr";
import axios from "axios";


export default async function ItemDetailContainer(props: any) {
    
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
        <section>
            <ItemReviewComponent itemList={itemList}/>
        </section>
    );
};


