// ISR (Incremental Site Regeneration)
// use client 쓰지 마세요.
// 이기웅 작성.

import CategroyMenuContainer from "@/containers/category/categoryMenu/ssr";
import CategoryNameContainer from "@/containers/category/categoryTopName/ssr";
import axios from "axios";

async function fetchCategoryServerRenderedData() {
    const categoryData = ['watch', 'top', 'skirt', 'shoes', 'pants', 'outer', 'onepiece', 'headwear', 'bag', 'accessory'];
    return categoryData;
}

async function categoryData(category: string) {
    const res = await axios.get('http://localhost:4000/item/categoryview', {
        params: { category },
    })
    return {
    props: {
      list: res.data,
    },
    revalidate: 20,
  };
}


export async function generateStaticParams() {
    const category = await fetchCategoryServerRenderedData();
    const categoryList = []
    for (let i = 0; i < category.length; i++) {
        const item = await categoryData(category[i])
        for (let j = 0; j < item.props.list.page; j++) {
            categoryList.push([category[i], (j+1).toString()])
        }
    }
    return (
        categoryList.map((value) => (
            {
                category: value[0],
                page: value[1]
            }))
    )
}

export default async function CategroyPage(parmas: { params: { category: string, page:string } }) {
    const category = parmas.params.category
    const page = parmas.params.page
    const categorypage = await categoryData(category) 

    return (
        <main className="Main flex flex-col w-full min-h-[1300px] pt-[80px] px-[15%]">
            <CategoryNameContainer category={category} page={page}/>
            <CategroyMenuContainer category={category} page={page} totalpage={categorypage.props.list.page}/>
        </main>
    )

};

