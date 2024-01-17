// CSR (Client Side Rendering) Component
// 이기웅 작성.

'use client'

import Image from "next/image";

export default function PaymentWindowComponent() {


    return (
        <div>
            <div>
                <p className="text-[40px] font-bold my-[50px]">주문/결제</p>
            </div>
            <div className="flex justify-between w-full">
                <div className="w-[45%]">
                    <div className="flex flex-col justify-between">
                        <div className="w-[50%] font-bold mb-[60px] mx-[25%]">
                            <div className="flex justify-between">
                                <p className="text-[25px]">주문자 정보</p>
                                <button className="p-[8px] text-[12px] border">주문자 정보변경</button>
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="p-[10px]">이름</td>
                                        <td>username</td>
                                    </tr>
                                    <tr>
                                        <td className="p-[10px]">연락처</td>
                                        <td>010-1111-1111</td>
                                    </tr>
                                    <tr>
                                        <td className="p-[10px]">이메일</td>
                                        <td>사용자 이메일</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="w-[50%] font-bold mb-[40px] mx-[25%]">
                            <div className="flex justify-between">
                                <p className="text-[25px]">배송 정보</p>
                                <button className="p-[8px] text-[12px] border">배송정보 변경</button>
                            </div>
                            <div>
                                <p>이름</p>
                                <p>주소</p>
                                <p>전화번호</p>
                            </div>
                        </div>
                        <div className="w-[50%] font-bold mb-[40px] mx-[25%]">
                            <div>
                                <p className="text-[25px]">배송 요청사항</p>
                            </div>
                            <ul>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold text-[16px]">한국 배송 상품</p>
                        <div>
                            <div className="flex w-full">
                                <div className="w-[35%]">
                                    <Image src={""} alt={""}></Image>
                                </div>
                                <div className="w-[55%]">
                                    <p></p>
                                    <p></p>
                                    <p></p>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-[4px] bg-black"></div>
                        <div className="flex justify-between">
                            <p>총 수량</p>
                            <p>가격</p>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold">O머니</p>
                        <p>보유한 O머니 4000원</p>
                        <div className="flex justify-between">
                            <input className="w-[65%]" type="text" />
                            <button className="font-bold">최대 금액 사용</button>
                        </div>
                        <div className="w-[80%] h-[1px] bg-gray-200 my-[10px]"></div>
                        <p>적립금은 총 결제 금액의 최대 5% 사용 가능합니다.</p>
                    </div>
                    <div>
                        <p></p>
                        <p></p>
                        <div>
                            <button>가상계좌</button>
                            <button>신용카드</button>
                        </div>
                        <div className="w-[100%] h-[1px] bg-gray-200 my-[10px]"></div>
                    </div>
                    <div>
                        <p>간편결제</p>
                        <div>
                            <button></button>
                            <button></button>
                            <button></button>
                        </div>
                    </div>
                    <div className="w-[50%] font-bold mb-[60px] mx-[25%]">
                        <div className="flex justify-between">
                            <p className="text-[25px]">적립 예정 O머니</p>
                            <button className="p-[8px] border">가격</button>
                        </div>
                        <div className="w-[100%] h-[1px] bg-gray-200 my-[10px]"></div>
                        <div className="flex justify-between">
                            <p className="text-[25px]">구매 적립</p>
                            <button className="p-[8px] border">가격</button>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-[25px]">리뷰 적립</p>
                            <button className="p-[8px] border">가격</button>
                        </div>
                    </div>
                </div>
                <div className="w-[45%]">
                    <div className="flex flex-col font-bold mb-[40px]">
                        <p>결제금액</p>
                        <table>
                            <tbody>
                                <tr>
                                    <td className="p-[10px]">주문 상품수</td>
                                    <td>n개</td>
                                </tr>
                                <tr>
                                    <td className="p-[10px]">총 상품 가격</td>
                                    <td>가격</td>
                                </tr>
                                <tr>
                                    <td className="p-[10px]">상품 할인</td>
                                    <td>할인 가격</td>
                                </tr>
                                <tr>
                                    <td className="p-[10px]">O머니 사용</td>
                                    <td>가격</td>
                                </tr>
                                <tr>
                                    <td className="p-[10px]">관부가세</td>
                                    <td>관부가세 없음</td>
                                </tr>
                                <tr>
                                    <td className="p-[10px]">배송비</td>
                                    <td>전상품 무료 배송</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex justify-between py-[10px] border-y-2">
                            <p>총 결제금액</p>
                            <p>결제금액</p>
                        </div>
                        <div className="flex flex-col">
                            <div className="w-full my-[15px] border-b-1 border-black">
                                <input type="checkbox" style={{ zoom: 1.5 }} />
                                <span>주문 정보를 확인하였으며, 약관</span>
                            </div>
                            <div>
                                <input type="checkbox" style={{ zoom: 1.5 }} />
                                <span></span>
                            </div>
                            <div>
                                <input type="checkbox" style={{ zoom: 1.5 }} />
                                <span></span>
                            </div>
                        </div>
                        <table>
                            <tbody>
                                <tr>
                                    <td className="p-[10px]">주문 상품수</td>
                                    <td>n개</td>
                                </tr>
                                <tr>
                                    <td className="p-[10px]">총 상품 가격</td>
                                    <td>가격</td>
                                </tr>
                                <tr>
                                    <td className="p-[10px]">상품 할인</td>
                                    <td>할인 가격</td>
                                </tr>
                            </tbody>
                        </table>
                        <button>n결제하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}