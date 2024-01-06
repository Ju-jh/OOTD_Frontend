// ISR (Incremental Site Regeneration)
// use client 쓰지 마세요.
// 이기웅 작성.

import DetailOrderContainer from "@/containers/detail/detailorder/ssr";
import ItemDetailContainer from "@/containers/detail/itemdetail/ssr";
import ItemGuideContainer from "@/containers/detail/itemguide/ssr";
import ItemReviewContainer from "@/containers/detail/itemreview/ssr";

export default async function detailPage( parmas:{ params: { item: string }}) {
    console.log(parmas.params.item);
    
    const item = parmas.params.item

    return (
        <main className="Main flex flex-col w-full bg-blue-200 min-h-[1300px] pt-[80px]">
            <DetailOrderContainer/>
            <ItemDetailContainer/>
            <ItemReviewContainer/>
            <ItemGuideContainer/>
        </main>
    )

};

