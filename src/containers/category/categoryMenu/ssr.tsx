import CategoryListComponent from "@/components/category/categoryList/csr";
import CategoryMenuBarComponent from "@/components/category/categoryMenuBar/csr";
import axios from "axios";

async function categoryData(categoryName:string) {
    const res = await axios.get('http://localhost:4000/item/categoryview', {
        params: { categoryName },
    })
    return res.data
}

export default async function CategoryMenuContainer(category: any) {

    const categoryName = category.category
    const categoryList = categoryData(categoryName)


    return (
        <section className='flex justify-between w-full pt-[40px]'>
            <CategoryMenuBarComponent />
            <CategoryListComponent categoryList={categoryList} />
        </section>
    );
}


export async function generateStaticParams() {
    const category = ['outer', 'top', 'pants', 'shoes', 'bag', 'accessary', 'headwear', 'onepiece', 'skirt', 'socks']
    return category.map((categoryList) => ({ category: categoryList.toString() }));
}