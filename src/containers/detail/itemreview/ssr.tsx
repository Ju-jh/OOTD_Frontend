// SSR (Server Side Rendering) Container
// 이기웅 작성.

import ItemReviewComponent from "@/components/detail/itemreview/csr";

export default function ItemReviewContainer() {
    return (
        <section className='pt-[10px]'>
            <ItemReviewComponent/>
        </section>
    );
};


