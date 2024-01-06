import CategoryListComponent from "@/components/category/categoryList/csr";
import CategoryMenuBarComponent from "@/components/category/categoryMenuBar/csr";

export default function CategoryMenuContainer (){

    return(
        <section className='flex justify-between w-full h-[1100px] pt-[40px]'>
            <CategoryMenuBarComponent/>
            <CategoryListComponent/>
        </section>
    );

}