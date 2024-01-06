// ISR (Incremental Site Regeneration)
// use client 쓰지 마세요.
// 이기웅 작성.

import CategroyMenuContainer from "@/containers/category/categoryMenu/ssr";
import CategoryNameContainer from "@/containers/category/categoryTopName/ssr";

async function fetchCategoryServerRenderedData() {
    // const response = await fetch('api-endpoint');
    // { cache: 'no-store' } <-- 캐시 강제 (isr)
    // const data = await response.json();
    // return data.serverRenderedData;
    const categoryData = ['outer', 'top', 'pants', 'shoes', 'hat', 'bag', 'accessary', 'headwear', 'onepiece', 'skirt', 'socks', 'sports', 'underwear'];
    return categoryData;
}

export async function generateStaticParams() {
    const category = await fetchCategoryServerRenderedData();
    return category.map(category => ({
        category: category.toString()
    }))
}

export default async function CategroyPage( parmas:{ params: { category: string }}) {
    console.log(parmas.params.category);
    
    const category = parmas.params.category

    return (
        <main className="Main flex flex-col w-full min-h-[1300px] pt-[80px] px-[15%]">
            <CategoryNameContainer categoryParm={category} />
            <CategroyMenuContainer />
        </main>
    )

};

