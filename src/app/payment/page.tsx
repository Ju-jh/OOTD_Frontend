// ISR (Incremental Site Regeneration)
// 이기웅 작성.

import PaymentContainer from "@/containers/payment/ssr"

export default async function paymentPage() {

    return (
        <main className="Main flex flex-col w-full min-h-[1300px] pt-[80px]">
            <PaymentContainer/>
        </main>
    )

};

