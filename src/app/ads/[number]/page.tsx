// ISR (Incremental Site Regeneration)
// use client 쓰지 마세요.
// 주재훈 작성.

export async function generateStaticParams () {

    const numbers = ['1', '2', '3']; 
    return numbers.map(number => ({
        number: number.toString()
    }))
}

export default async function AdsPage(params:{ params: { number: string }}) {
    return (
        <main className="Main flex flex-col w-full min-h-[1300px] pt-[80px]">
            <p>Ads: {params.params.number}</p>
        </main>
    )
};