// SSR (Server Side Rendering) Container
// 이기웅 작성.

import ItemDetailComponent from "@/components/detail/itemdetail/csr";

export default function ItemDetailContainer() {
    return (
        <section className='pt-[10px] mb-[40px]'>
            <ItemDetailComponent/>
        </section>
    );
};


