// CSR (Client Side Rendering) Component
// 이기웅 작성.

'use client'

import { EVENT_COLOR, STAR_COLOR } from "@/constants/color";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCaretDown, faCaretUp, faChevronDown, faChevronRight, faChevronUp, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RequestPayParams, RequestPayResponse } from "iamport-typings";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ItemOrderComponent(itemList: any) {

    const onClickPayment = () => {
        if (!window.IMP) return;
        /* 1. 가맹점 식별하기 */
        const { IMP } = window;
        IMP.init("imp57123366"); // 가맹점 식별코드

        /* 2. 결제 데이터 정의하기 */
        const data: RequestPayParams = {
            pg: "kakaopay", // PG사 : https://developers.portone.io/docs/ko/tip/pg-2 참고
            pay_method: "card", // 결제수단
            merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
            amount: 1000, // 결제금액
            name: "아임포트 결제 데이터 분석", // 주문명
            buyer_name: "홍길동", // 구매자 이름
            buyer_tel: "01012341234", // 구매자 전화번호
            buyer_email: "sg4582@naver.com", // 구매자 이메일
            buyer_addr: "신사동 661-16", // 구매자 주소
            buyer_postcode: "06018", // 구매자 우편번호
        };

        /* 4. 결제 창 호출하기 */
        IMP.request_pay(data, callback);
    };

    function callback(response: RequestPayResponse) {
        const { success, error_msg } = response;

        if (success) {
            alert("결제 성공");
        } else {
            alert(`결제 실패: ${error_msg}`);
        }
    }

    const item = itemList.itemList

    const [isSize, setIsSize] = useState(false)

    const discount = Math.round(parseInt(item.discount) / parseInt(item.price) * 100)

    const checkBtn = () => {
        setIsSize(!isSize)
    }



    return (
        <section>
            <div className="flex justify-between">
                <Image className="w-[50%] max-w-[500px] h-[575px]" src={item.photo} width={"1000"} height={"500"} alt={""}></Image>
                <div className="flex flex-col w-[45%]">
                    <div>
                        <div className="flex justify-between">
                            <button className="flex h-[20px] font-bold ">
                                <span className="text-[16px]">{item.brand}</span>
                                <FontAwesomeIcon className="h-[16px] w-[16px] text-[16px] mt-[4px]" icon={faChevronRight} />
                            </button>
                            <div>
                                <button className="w-[40px] h-[40px]">
                                    <FontAwesomeIcon className="w-[28px] h-[28px]" icon={faHeart} />
                                </button>
                                <button className="w-[40px] h-[40px]">
                                    <FontAwesomeIcon className="w-[28px] h-[28px]" icon={faShareNodes} />
                                </button>
                            </div>
                        </div>
                        <p className="text-[16px] my-[4px]">
                            {item.title}
                        </p>
                        <div className="flex h-[16px]">
                            <div className="relative h-[16px] w-[70px] leading-[16px]">
                                <div className={`absolute text-gray-300 h-[16px] text-[16px]`}>★★★★★</div>
                                <div style={{ color: STAR_COLOR }} className="absolute h-[16px] text-[16px] w-[30%] overflow-hidden">★★★★★</div>
                            </div>
                            <span className="h-[16px] leading-[16px] text-[14px] text-gray-300">(2)</span>
                        </div>

                        <div className="flex flex-col mt-[10px] mb-[24px]">
                            {parseInt(item.discount) == 0 ? null : <div className="text-[14px]">
                                <span style={{ color: EVENT_COLOR }}>{`${discount}%`}</span>
                                <span className="line-through text-gray-300 mx-[5px]">{parseInt(item.price).toLocaleString()}</span>
                            </div>}
                            <div>
                                <span className="text-[20px] font-bold">{(parseInt(item.price) - parseInt(item.discount)).toLocaleString() + "원"}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex text-[14px] mb-[12px]">
                        <p className="w-[80px]">배송비</p>
                        <span>전상품 무료배송(대형가구와 같은 대형 상품 제외)</span>
                    </div>
                    <div className="flex text-[14px] mb-[12px]">
                        <p className="w-[80px]">관부가세</p>
                        <span>관부가세 없음</span>
                    </div>
                    <div className="flex text-[14px] mb-[12px]">
                        <p className="w-[80px]">배송예정일</p>
                        <span>1~2일 이내</span>
                    </div>
                    <div className="flex text-[14px] mb-[12px]">
                        <p className="w-[80px]">포인트 적립</p>
                        <span>최대 10,200원 적립</span>
                    </div>
                    <div className="flex text-[14px] mb-[12px]">
                        <p className="w-[80px]">반품/교환</p>
                        <span>반품/교환 가능</span>
                    </div>
                    <div className="w-full h-[1px] bg-gray-200 my-[15px]"></div>
                    <div className="flex text-[14px] mb-[40px]">
                        <p className="w-[80px]">결제안내</p>
                        <button className="flex text-center h-[20px]">
                            <span className="text-[16px]">1월 무이자 카드 할부 안내</span>
                            <FontAwesomeIcon className="h-[16px] w-[16px] text-[16px] mt-[4px]" icon={faChevronRight} />
                        </button>
                    </div>
                    {item.category == "watch" ? null : <div className="mb-[10px]">
                        <div className="flex text-center mb-[10px]">
                            <span className="text-[16px]">사이즈 가이드</span>
                            <FontAwesomeIcon className="h-[16px] w-[16px] text-[16px] mt-[4px]" icon={faChevronRight} />
                        </div>
                        <div className="relative w-full">
                            <div onClick={checkBtn} className={`flex justify-between p-[12px] border ${isSize ? "border-b-0" : "border-1"} border-black`}>
                                <span className="text-[16px]">사이즈를 선택해주세요.</span>
                                {isSize ? <FontAwesomeIcon className="h-[16px] w-[16px] text-[16px]" icon={faCaretUp} /> : <FontAwesomeIcon className="h-[16px] w-[16px] text-[16px]" icon={faCaretDown} />}
                            </div>
                            <div className={`${isSize ? "" : "hidden"} absolute w-full bg-gray-200 border border-black text-black z-1`}>
                                <div className="p-[12px]">S</div>
                                <div className="p-[12px]">M</div>
                                <div className="p-[12px]">L</div>
                                <div className="p-[12px]">XL</div>
                                <div className="p-[12px]">XXL</div>
                            </div>
                        </div>
                    </div>}
                    <div className="flex justify-between text-[16px] font-bold">
                        <button className="h-[52px] min-w-[200px] w-[48%] border border-1 border-black rounded">장바구니</button>
                        <button onClick={onClickPayment} className="h-[52px] min-w-[200px] w-[48%] border border-1 border-black rounded">구매하기</button>
                    </div>
                </div>
            </div>
        </section>
    );
}