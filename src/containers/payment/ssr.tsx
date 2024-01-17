// CSR (Client Side Rendering) Container
// 이기웅 작성.

import PaymentWindowComponent from "@/components/payment/paymentwindow/csr";

export default function PaymentContainer() {

  return (
    <section className='mx-[15%]'>
      <PaymentWindowComponent/>
    </section>
  );
}


