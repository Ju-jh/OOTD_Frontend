import CategoryNameComponent from "@/components/category/categoryName/csr";
import axios from "axios";

type Data = {
    category: string;
    page:string
}

export default function CategoryNameContainer({ category,page }: Data) {

    return (
        <section className='w-full h-[106px]'>
            <CategoryNameComponent category={category} />
        </section>
    );

}