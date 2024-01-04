import CategoryNameComponent from "@/components/category/categoryName/csr";

type Data = {
    categoryParm: string;
}

export default function CategoryName({ categoryParm }: Data) {

    return (
        <section className='w-full h-[106px] px-[35px]'>
            <CategoryNameComponent categoryParma={categoryParm} />
        </section>
    );

}