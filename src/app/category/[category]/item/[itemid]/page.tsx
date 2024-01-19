// ISR (Incremental Site Regeneration)
// 이기웅 작성.

import DetailOrderContainer from "@/containers/detail/detailorder/ssr";
import ItemDetailContainer from "@/containers/detail/itemdetail/ssr";

export default async function detailPage(parmas: { params: { itemid: string } }) {

    const item = parmas.params.itemid

    return (
        <main className="Main flex flex-col w-full min-h-[1300px] pt-[80px]">
            <DetailOrderContainer item={item} />
            <ItemDetailContainer item={item} />
        </main>
    )

};

