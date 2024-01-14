import CategoryListComponent from "@/components/category/categoryList/csr";
import CategoryMenuBarComponent from "@/components/category/categoryMenuBar/csr";
import axios from "axios";

type Data = {
    category: string;
    page:string
    totalpage:number
}

async function categoryPage(category: string, page: any) {
    page = parseInt(page) -1
    const res = await axios.get('http://localhost:4000/item/categorypage', {
        params: { category, page},
    })
    return {
        props: {
          list: res.data,
        },
        revalidate: 20,
      };
}

export default async function CategoryMenuContainer({category, page, totalpage}:Data) {
    const categoryData = await categoryPage(category,page)

    return (
        <section className='flex justify-between w-full pt-[40px]'>
            <CategoryMenuBarComponent />
            <CategoryListComponent categoryname={category} category={categoryData.props.list} page={page} totalpage={totalpage}/>
        </section>
    );
}