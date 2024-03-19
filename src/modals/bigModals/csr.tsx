'use client'

import { CHANGE_IMAGE } from '@/constants/endpoint';
import { useAuth } from '@/hooks/context/isLogined';
import { useModal } from '@/hooks/context/modal';
import { faCartShopping, faEnvelopeOpenText, faMagnifyingGlass, faPlane, faTruck, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { useEffect } from 'react';

export const PhotoChangeModalComponent = () => {
  const { photo } = useAuth()
  const { openModal, closeModal } = useModal();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    setSelectedFile(selected || null);
  };

  const handleConfirm = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('images', selectedFile);

      try {
        const response = await axios.post(CHANGE_IMAGE, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });

        if (response) {
          closeModal();
          openModal('ChangePhotoAlertComponent')
        }
      } catch (error) {
        console.log(error);

      }
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(18, 18, 18, 0.8)',
        position: 'fixed',
        zIndex: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <div
        className='mx-auto rounded-md w-[500px] h-[800px] overflow-hidden bg-white flex flex-col justify-between'
        style={{
          backgroundColor: 'white',
          opacity: '1',
          zIndex: 210,
        }}
      >
        <div className='flex items-center justify-between p-[40px]'>
          <span className='text-black text-[20px] font-bold'>이미지 업로드</span>
          <button onClick={closeModal} className='text-black text-[20px] font-bold'><FontAwesomeIcon icon={faX} /></button>
        </div>
        <div className='w-[100%] h-[80%] p-[40px] flex flex-col items-center justify-between gap-[20px]'>
          {selectedFile ? (
            <Image
              src={URL.createObjectURL(selectedFile)}
              alt='SelectedProfileImage'
              width={500}
              height={500}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          ) : (
            <Image
              src={photo}
              alt='OriginalProfileImage'
              width={500}
              height={500}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          )}
          <div className='flex items-center justify-between gap-[20px] w-[100%]'>
            <input type='file' accept='image/*' onChange={handleFileChange} ref={fileInputRef} className='hidden' id='fileInput' />
            {selectedFile ? (
              <div className='text-black font-bold overflow-hidden max-w-full'>
                <span
                  className='truncate'
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    WebkitLineClamp: 1,
                  }}
                >
                  {selectedFile.name.length > 20
                    ? `${selectedFile.name.substring(0, 20)}...${selectedFile.name.split('.').pop()}`
                    : selectedFile.name
                  }
                </span>
              </div>
            ) : (
              <div className='text-black font-bold overflow-hidden max-w-full'>
                <span
                  className='truncate'
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    WebkitLineClamp: 1,
                  }}
                >
                  파일을 추가(선택)해 주세요.
                </span>
              </div>
            )}
            <label htmlFor='fileInput' className='cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md r-0'>
              파일 선택
            </label>
          </div>
        </div>
        <div className='w-[100%] h-[70px] overflow-hidden flex text-[20px]'>
          <button onClick={closeModal} className='w-[50%] h-[100%] bg-[#333333] font-bold text-white'>닫기</button>
          <button onClick={handleConfirm} className='flex-1 bg-[#111111] font-bold text-white'>확인</button>
        </div>
      </div>
    </div>
  );
};

export const PhoneNumberChangeModalComponent = () => {
  const { closeModal } = useModal();
  const [phoneNumber, setPhoneNumber] = useState('')
  const [VerfiyNumber, setVerifyNumber] = useState('');
  const [selectedPrefix, setSelectedPrefix] = useState('010');
  const [isVerifyCodeSend, setIsVerifyCodeSend] = useState(false)
  const [isPhoneNumberVerified, setIsEmailVerified] = useState(false);

  const handlePhoneNumberChange = (e: any) => {
    const { name, value } = e.target;

    if (name === 'prefix') {
      setSelectedPrefix(value);
    } else {
      const newPhoneNumber = value;
      setPhoneNumber(newPhoneNumber);
    }
  };

  const handleVerfiyNumberChange = (e: any) => {
    const newEmailVerifyNumber = e.target.value;
    setVerifyNumber(newEmailVerifyNumber);
  };

  const clickSendVerfiyCode = async (phoneNumber: string) => {
    console.log(selectedPrefix + phoneNumber)
  };

  const handleConfirm = async () => {
    closeModal()
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(18, 18, 18, 0.8)',
        position: 'fixed',
        zIndex: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <div
        className='mx-auto rounded-md w-[500px] h-[800px] overflow-hidden bg-white flex flex-col justify-between'
        style={{
          backgroundColor: 'white',
          opacity: '1',
          zIndex: 210,
        }}
      >
        <div className='flex items-center justify-between p-[40px]'>
          <span className='text-black text-[20px] font-bold'>전화번호 추가 및 변경</span>
          <button onClick={closeModal} className='text-black text-[20px] font-bold'><FontAwesomeIcon icon={faX} /></button>
        </div>
        <div className='w-[100%] h-[80%] p-[40px] flex flex-col items-center justify-between gap-[20px]'>
          <div className='w-[100%] flex flex-col items-center jusfity-center'>
            <p className='w-[100%] text-start text-[13px] mb-[5px] text-black'>연락처</p>
            <div className='w-[100%] flex items-center jusfity-center'>
              <select
                name='prefix'
                className='w-[20%] h-[40px] mr-[7px] flex items-center justify-center text-black px-[10px] border focus:border-purple-400 outline-none'
                value={selectedPrefix}
                onChange={handlePhoneNumberChange}
                disabled={isPhoneNumberVerified || isVerifyCodeSend}
              >
                <option value='010'>010</option>
                <option value='017'>017</option>
                <option value='011'>011</option>
              </select>
              <input
                type='text'
                name='number'
                className='w-[60%] h-[40px] mr-[7px] text-black p-[10px] border focus:border-purple-400 outline-none'
                placeholder='전화번호 뒷자리를 입력하세요.'
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                disabled={isPhoneNumberVerified || isVerifyCodeSend}
              />
              <button
                className={`w-[20%] h-[40px] ${isVerifyCodeSend || isPhoneNumberVerified ? 'bg-gray-300' : 'bg-blue-200 hover:bg-blue-300'}  `}
                onClick={() => clickSendVerfiyCode(phoneNumber)}
                disabled={isPhoneNumberVerified || isVerifyCodeSend}
              >
                <span className='text-[14px] font-semibold text-black'>전송</span>
              </button>
            </div>
            <p className='w-[100%] mt-[40px] text-start text-[13px] mb-[5px] text-black'>인증번호</p>
            <div className='w-[100%] flex items-center jusfity-center'>
              <input
                type='number'
                name='number'
                className='w-[60%] h-[40px] mr-[7px] text-black p-[10px] border focus:border-purple-400 outline-none'
                placeholder='인증번호 입력'
                value={VerfiyNumber}
                onChange={handleVerfiyNumberChange}
                disabled={isPhoneNumberVerified || isVerifyCodeSend}
              />
            </div>
          </div>
        </div>
        <div className='w-[100%] h-[70px] overflow-hidden flex text-[20px]'>
          <button onClick={closeModal} className='w-[50%] h-[100%] bg-[#333333] font-bold text-white'>닫기</button>
          <button onClick={handleConfirm} className='flex-1 bg-[#111111] font-bold text-white'>인증</button>
        </div>
      </div>
    </div>
  );
};

export const ProductInformationComponent = () => {
  const { closeModal } = useModal();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(18, 18, 18, 0.8)',
        position: 'fixed',
        zIndex: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <div
        className='mx-auto w-[500px] h-[800px] bg-white flex flex-col'
        style={{
          backgroundColor: 'white',
          opacity: '1',
          zIndex: 210,
        }}
      >
        <div className='flex items-center justify-between p-[40px]'>
          <span className='flex-1 text-center text-black text-[20px] font-bold'>상품고시</span>
          <button onClick={closeModal} className='text-black text-[20px] font-bold'><FontAwesomeIcon icon={faX} /></button>
        </div>
        <tbody className='border mx-[5%] text-center text-[12px]'>
          <tr>
            <td className='w-[50%] p-[10px] border-b border-r bg-gray-100'>종류</td>
            <td className='w-[50%] p-[10px] border-b'>상품 상세 페이지 참조</td>
          </tr>
          <tr>
            <td className='w-[50%] p-[10px] border-b border-r bg-gray-100'>소재</td>
            <td className='w-[50%] p-[10px] border-b'>상품 상세 페이지 참조</td>
          </tr>
          <tr>
            <td className='w-[50%] p-[10px] border-b border-r bg-gray-100'>색상</td>
            <td className='w-[50%] p-[10px] border-b'>상품 상세 페이지 참조</td>
          </tr>
          <tr>
            <td className='w-[50%] p-[10px] border-b border-r bg-gray-100'>크기</td>
            <td className='w-[50%] p-[10px] border-b'>상품 상세 페이지 참조</td>
          </tr>
          <tr>
            <td className='w-[50%] p-[10px] border-b border-r bg-gray-100'>제조자(수입자)</td>
            <td className='w-[50%] p-[10px] border-b'>브랜드/ootd</td>
          </tr>
          <tr>
            <td className='w-[50%] p-[10px] border-b border-r bg-gray-100'>제조국</td>
            <td className='w-[50%] p-[10px] border-b'>상품 상세 페이지 참조</td>
          </tr>
          <tr>
            <td className='w-[50%] p-[10px] border-b border-r bg-gray-100'>취급시 주의사항</td>
            <td className='w-[50%] p-[10px] border-b'>상품 상세 페이지 참조</td>
          </tr>
          <tr>
            <td className='w-[50%] p-[10px] border-b border-r bg-gray-100'>품질보증기준</td>
            <td className='w-[50%] p-[10px] border-b'>제품 이상 시 공정거래위원회 고시 소비자분쟁해결기준에 의거 보상합니다.</td>
          </tr>
          <tr>
            <td className='w-[50%] p-[10px] border-b border-r bg-gray-100'>A/S 책임자와 전화번호</td>
            <td className='w-[50%] p-[10px] border-b'>ootd 고객센터 1234-1234</td>
          </tr>
        </tbody>
      </div>
    </div>
  );

};

export const DeliveryInformationComponent = () => {
  const { closeModal } = useModal();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(18, 18, 18, 0.8)',
        position: 'fixed',
        zIndex: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <div
        className='mx-auto w-[500px] h-[800px] overflow-hidden bg-white flex flex-col justify-between'
        style={{
          backgroundColor: 'white',
          opacity: '1',
          zIndex: 210,
        }}
      >
        <div className='flex justify-between items-center text-center p-[40px]'>
          <span className='text-black text-[20px] font-bold'>배송 안내</span>
          <button onClick={closeModal} className='text-black text-[20px] font-bold'><FontAwesomeIcon icon={faX} /></button>
        </div>
        <div className='flex flex-col h-[700px] mx-[40px]'>
          <div className='flex flex-col bg-gray-300 text-center py-[10px] mb-[20px]'>
            <p className='text-[16px]'><span className='font-bold text-[16px]'>2024년 1월 14일 (일) 구매기준 예상</span> 수령일</p>
            <p className='text-[14px]'>2024년 1월 30일 (화) ~ 2024년 2월 1일 (목)</p>
          </div>
          <div className='mb-[20px]'>
            <p className='font-bold text-[16px] mb-[20px]'>구매 과정 안내 (모든 예상 날짜는 영업일 기준)</p>
            <div className='flex justify-between'>
              <div className='w-[18%] text-center'>
                <div className='w-[60px] h-[60px] bg-black rounded-full flex items-center justify-center mx-auto'>
                  <FontAwesomeIcon className='text-white w-[30px] h-[30px]' icon={faCartShopping} />
                </div>
                <p>현지구매</p>
                <p>(2-5일)</p>
              </div>
              <div className='w-[18%] text-center'>
                <div className='h-[60px] w-[60px] bg-black rounded-full flex items-center justify-center mx-auto'>
                  <FontAwesomeIcon className='text-white w-[30px] h-[30px]' icon={faMagnifyingGlass} />
                </div>
                <p>제품 검수</p>
                <p>(1-2일)</p>
              </div>
              <div className='w-[18%] text-center'>
                <div className='h-[60px] w-[60px] bg-black rounded-full flex items-center justify-center mx-auto'>
                  <FontAwesomeIcon className='text-white w-[30px] h-[30px]' icon={faPlane} />
                </div>
                <p>현지출고</p>
                <p>(2-3일)</p>
              </div>
              <div className='w-[18%] text-center'>
                <div className='h-[60px] w-[60px] bg-black rounded-full flex items-center justify-center mx-auto'>
                  <FontAwesomeIcon className='text-white w-[30px] h-[30px]' icon={faEnvelopeOpenText} />
                </div>
                <p>세관통관</p>
                <p>(2-3일)</p>
              </div>
              <div className='w-[18%] text-center'>
                <div className='h-[60px] w-[60px] bg-black rounded-full flex items-center justify-center mx-auto'>
                  <FontAwesomeIcon className='text-white w-[30px] h-[30px]' icon={faTruck} />
                </div>
                <p>국내배송</p>
                <p>(1-2일)</p>
              </div>
            </div>
          </div>
          <div className='flex-1 bg-gray-200'>
            <div>
              <p className='font-bold text-[14px]'>현지 구매 : </p>
              <span className='text-[14px]'>고객님의 주문을 확인한 후 현지 온라인몰에서 구매를 시도합니다.</span>
            </div>
            <div>
              <p className='font-bold text-[14px]'>제품 검수 : </p>
              <span className='text-[14px]'>
                ootd 현지 사무실에 상품이 도착하면 전문팀에 의한 검수가 이루어집니다. 검수 중 불량 상품 반품 및 교환등의 상황이 발생할 경우 주문이 취소되거나 일정이 변동될 수 있습니다.
              </span>
            </div>
            <div>
              <p className='font-bold text-[14px]'>포장/출고 : </p>
              <span className='text-[14px]'>검수 완료된 상품은 즉각 트렌비 패킹팀의 손길을 거쳐 한국으로 출고됩니다.</span>
            </div>
            <div>
              <p className='font-bold text-[14px]'>세관 통관 : </p>
              <span className='text-[14px]'>
                인천공항에 도착한 상품은 정식 세관 통관 과정을 거치게 됩니다. 통관 과정은 관세청 홈페이지(http://www.customs.go.kr)를 통해 조회하실 수 있습니다.
              </span>
            </div>
            <div>
              <p className='font-bold text-[14px]'>국내 배송 : </p>
              <span className='text-[14px]'>통관이 완료된 상품은 즉시 국내 배송 파트너사에 인수되어 배송을 시작합니다.</span>
            </div>
          </div>
          <div className='my-[20px] text-[14px]'>
            <p>예상 일정은 현지 택배사의 사정이나 통관 과정에서 변동될 수 있습니다.</p>
            <p>현지 및 한국 공휴일, 연말이 포함된 경우 배송이 지연될 수 있습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );

};

export const RefundInformationComponent = () => {
  const { closeModal } = useModal();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(18, 18, 18, 0.8)',
        position: 'fixed',
        zIndex: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <div
        className='mx-auto w-[500px] h-[800px] bg-white flex flex-col'
        style={{
          backgroundColor: 'white',
          opacity: '1',
          zIndex: 210,
        }}
      >
        <div className='flex items-center justify-between p-[40px]'>
          <span className='flex-1 text-center text-black text-[20px] font-bold'>교환/반품 안내</span>
          <button onClick={closeModal} className='text-black text-[20px] font-bold'><FontAwesomeIcon icon={faX} /></button>
        </div>
        <div className='overflow-y-auto scrollbar-hide '>
          <div className='mx-[5%]'>
            <p className='font-bold text-[16px] my-[15px]'>취소 및 반품 수수료 안내</p>
            <div className='text-center mb-[20px] border text-center text-[12px]'>
              <tr>
                <td className='w-[50%] text-[14px] p-[10px] border-b border-r bg-gray-100'>입금 대기~주문 접수</td>
                <td className='w-[50%] text-[14px] p-[10px] border-b'>무료</td>
              </tr>
              <tr>
                <td className='w-[50%] text-[14px] p-[10px] border-b border-r bg-gray-100'>상품 준비 중부터</td>
                <td className='w-[50%] text-[14px] p-[10px] border-b'>27,500원</td>
              </tr>
              <tr>
                <td className='w-[50%] border-b border-r bg-gray-100'>
                  <p className='text-[14px] pt-[20px]'>배송 준비 중부터</p>
                </td>
                <td className='w-[50%] text-[14px] p-[10px] border-b'>150,000원 + 상품가액의 15~30% (관부가세 및 추가 배송비 등)</td>
              </tr>
            </div>
            <p className='font-bold my-[10px]'>※ 추가 반품비 안내</p>
            <li className='text-[14px] mb-[15px]'>기본 반품 수수료 외 추가 반품비가 발생할 수 있으며, 추가 반품비 최대 청구 금액은 상품금액의 30%를 넘지 않습니다.</li>
            <li className='text-[14px] mb-[15px]'>추가 반품비는 반품으로 인해 해외로 재입국 시 통관에 필요한 관부가세 및 배송비 등이며, 모든 비용은 증빙서류에 근거하여 실비로 청구됩니다.</li>
            <li className='text-[14px] mb-[15px]'>정확한 반품 비용은 실비를 근거로 청구하기 때문에 반품 진행 시, 확인하실 수 있습니다.</li>
            <p className='font-bold my-[10px]'>반품/교환 신청 가능 기간</p>
            <li className='text-[14px] mb-[15px]'>상품 수령 후 7일 이내 트렌비 고객센터 접수</li>
            <li className='text-[14px] mb-[15px]'>반품 신청 후 접수일 포함 3일 이내 택배 수거 접수 필요</li>
            <p className='font-bold my-[10px]'>반품/교환 신청 유의사항</p>
            <li className='text-[14px] mb-[15px]'>홈리빙 또는 일부 대형 가구의 상품 상세페이지에 별도 교환/환불 정책이 고지된 경우 우선 적용될 수 있습니다.</li>
            <li className='text-[14px] mb-[15px]'>파트너사의 가격 조정/세일 및 환율 변동 등으로, 동일 상품을 교환하는 경우 상품 가격 변동에 따른 결제 금액의 차이가 발생할 수 있습니다.</li>
          </div>
          <div className='mx-[5%]'>
            <p className='font-bold my-[10px]'>반품/교환 기준</p>
            <p className='font-bold text-[14px] my-[10px]'>상품 하자, 오배송 등 판매자 귀책사유에 해당하는 경우 무료 반품/교환해 드립니다.</p>
            <li className='text-[14px] mb-[15px]'>상품 수령 후 30일 이내 트렌비 고객센터 접수, 접수일 포함 3일 이내 반품 주소지로 택배 수거 접수 필요</li>
            <li className='text-[14px] mb-[15px]'>상품 하자/불량은 해당 브랜드의 품질 판단 기준을 바탕으로 한 [상품 하자 기준]에 따릅니다.</li>
            <p className='font-bold text-[14px] my-[10px]'>아래 판매자 귀책사유에 해당하지 않는 경우, 반품/교환 정책과 수수료는 위 명시된 기준에 따릅니다.</p>
            <li className='text-[14px] mb-[15px]'>고객님의 단순 변심, 과실 혹은 판단 착오(사이즈, 색상 등을 잘못 구입하신 경우)일 경우</li>
            <li className='text-[14px] mb-[15px]'>하자 기준에 부합하지 않는 경우</li>
            <li className='text-[14px] mb-[15px]'>개런티카드 및 보증서 미제공으로 인한 반품 및 교환(현지 대부분의 명품 매장은 개런티카드 및 보증서가 제공되지 않습니다.)</li>
            <p className='font-bold text-[14px] my-[10px]'>반품/교환 불가 안내</p>
            <li className='text-[14px] mb-[15px]'>반품 신청 기한이 경과한 경우</li>
            <li className='text-[14px] mb-[15px]'>상품 포장을 개봉 후 택(TAG) 제거, 라벨 및 상품 훼손으로 상품의 가치가 현저히 감소한 경우</li>
            <li className='text-[14px] mb-[15px]'>상품의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히 감소한 경우</li>
            <li className='text-[14px] mb-[15px]'>수영복, 란제리, 스타킹, 양말, 마스크 등의 상품을 시착 또는 부착 필름 제거한 경우 (위생상의 이유)</li>
            <li className='text-[14px] mb-[15px]'>영수증, 정품 보증서, 구성품(박스, 더스트 백, 포장 비닐, 쇼핑백 등) 등 동봉된 패키지 누락 및 훼손될 경우</li>
            <li className='text-[14px]'>프리오더 상품, 고객의 요청에 의한 주문제작 상품 및 지류(카드, 엽서, 책, 랩핑페이퍼, 벽지 등)</li>
          </div>
          <div className='h-[1px] w-[90%] mx-[5%] bg-gray-300 my-[25px]'></div>
          <p className='mx-[5%] text-[11px]'>※ 교환/반품 시 택 제거, 구성품 훼손 및 누락 등 배송 시 상태와 다른 경우 반품이 거부될 수 있으며, 이때 발생하는 추가비용(배송비용 및 관부가세 등)은 고객 부담이오니 주의해 주시기 바랍니다.</p>
        </div>
      </div>
    </div>
  );

};

export const CardInstallmentComponent = () => {
  const { closeModal } = useModal();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(18, 18, 18, 0.8)',
        position: 'fixed',
        zIndex: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <div
        className='mx-auto w-[500px] h-[800px] overflow-hidden bg-white flex flex-col justify-between'
        style={{
          backgroundColor: 'white',
          opacity: '1',
          zIndex: 210,
        }}
      >
        <div className='flex items-center justify-between p-[40px]'>
          <span className='text-black text-[20px] font-bold'>1월 무이자 카드 할부 안내</span>
          <button onClick={closeModal} className='text-black text-[20px] font-bold'><FontAwesomeIcon icon={faX} /></button>
        </div>
        <div className='relative h-[700px] mx-[5%] mb-[5%]'>
          <Image src={'https://image-cdn.trenbe.com/1000/1704674983001-0cbfc70e-182b-49cb-9a7d-0fa3ab0fc561.jpg'} alt={''} fill></Image>
        </div>
      </div>
    </div>
  );

};

export const ShippingAddressComponent = () => {
  const { closeModal } = useModal();
  const [isdata, setIsData] = useState("")

  const handleComplete = (data: any) => {
    axios.post( "api/order/upaddress", data , {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true,
    })
    setIsData(data.address)
  };

  const style = {
    height: "450px"
  }
  
  useEffect(() => {
    if (isdata !== "") {
      closeModal();
    }
  }, [isdata, closeModal]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(18, 18, 18, 0.8)',
        position: 'fixed',
        zIndex: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <div
        className='mx-auto w-[500px] h-[600px] overflow-hidden bg-white flex flex-col justify-between'
        style={{
          backgroundColor: 'white',
          opacity: '1',
          zIndex: 210,
        }}
      >
        <div className='flex items-center justify-between p-[40px]'>
          <span className='text-black text-[20px] font-bold'>도로명 주소 검색</span>
          <button onClick={closeModal} className='text-black text-[20px] font-bold'><FontAwesomeIcon icon={faX} /></button>
        </div>
        <div className='relative h-[600px] mx-[5%] mb-[5%]'>
          <DaumPostcode style={style} onComplete={handleComplete} />
        </div>
      </div>
    </div>
  );

};