// SSR (Server Side Rendering) Container
// 이기웅 작성.

import ItemGuideComponent from "@/components/detail/itemguide/csr";

export default function ItemGuideContainer() {
    return (
        <section className='pt-[10px] mb-[40px]'>
            <ItemGuideComponent/>
        </section>
    );
};


