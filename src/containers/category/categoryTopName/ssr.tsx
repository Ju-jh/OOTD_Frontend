import CategoryNameComponent from "@/components/category/categoryName/csr";

type Data = {
    categoryParm: string;
}

export default function CategoryNameContainer({ categoryParm }: Data) {

    return (
        <section className='w-full h-[106px]'>
            <CategoryNameComponent categoryParma={categoryParm} />
        </section>
    );

}