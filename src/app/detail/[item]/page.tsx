// ISR (Incremental Site Regeneration)
// 이기웅 작성.

import DetailOrderContainer from "@/containers/detail/detailorder/ssr";
import ItemDetailContainer from "@/containers/detail/itemdetail/ssr";
import ItemGuideContainer from "@/containers/detail/itemguide/ssr";
import ItemReviewContainer from "@/containers/detail/itemreview/ssr";

export default async function detailPage( parmas:{ params: { item: string }}) {
    console.log(parmas.params.item);
    
    const item = parmas.params.item

    return (
        <main className="Main flex flex-col w-full min-h-[1300px] pt-[80px]">
            <DetailOrderContainer/>
            <div className="w-full h-[10px] bg-gray-200 my-[64px]"></div>
            <ItemDetailContainer/>
            <div className="w-full h-[10px] bg-gray-200 my-[64px]"></div>
            <ItemReviewContainer/>
            <div className="w-full h-[10px] bg-gray-200 my-[64px]"></div>
            <ItemGuideContainer/>
        </main>
    )

};

