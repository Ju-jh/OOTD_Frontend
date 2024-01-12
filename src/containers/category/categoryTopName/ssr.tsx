import CategoryNameComponent from "@/components/category/categoryName/csr";
import axios from "axios";

type Data = {
    category: string;
}

export default function CategoryNameContainer({ category }: Data) {

    return (
        <section className='w-full h-[106px]'>
            <CategoryNameComponent category={category} />
        </section>
    );

}