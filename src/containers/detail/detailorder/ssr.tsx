// SSR (Server Side Rendering) Container
// 이기웅 작성.

import Image from "next/image";
import ItemOrderComponent from "@/components/detail/itemorder/csr";

export default function DetailOrderContainer() {
    return (
        <section className='flex justify-between h-[700px] pt-[20px] mx-[5%]'>
            <Image className="w-[50%] h-[90%]" src={"/images/images.jpg"} width={"1000"} height={"500"} alt={""}></Image>
            <ItemOrderComponent />
        </section>
    );
};


