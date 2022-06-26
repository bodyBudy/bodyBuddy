import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { OptionCheckBox } from '@components/common/checkbox';
import Image from 'next/image';
import { Select } from '@components/common/select';
import { city, district } from '@data';
import { Radio } from '@components/common/radio';

const DetailOption = ({ isModalState, onChangeSetState }: any) => {
  const fieldList = [
    {
      checkBoxItemID: '123',
      checkBoxText: 'PT',
      checkBoxImage: '/assets/index/option/pt.svg',
      checkBoxCheckedImage: '/assets/index/option/pt-checked.svg',
    },
    {
      checkBoxItemID: '124',
      checkBoxText: '요가',
      checkBoxImage: '/assets/index/option/yoga.svg',
      checkBoxCheckedImage: '/assets/index/option/yoga-checked.svg',
    },
    {
      checkBoxItemID: '125',
      checkBoxText: '필라테스',
      checkBoxImage: '/assets/index/option/pilates.svg',
      checkBoxCheckedImage: '/assets/index/option/pilates-checked.svg',
    },
    {
      checkBoxItemID: '126',
      checkBoxText: '발레',
      checkBoxImage: '/assets/index/option/ballet.svg',
      checkBoxCheckedImage: '/assets/index/option/ballet-checked.svg',
    },
  ];

  const purposeList = [
    {
      checkBoxItemID: '1123',
      checkBoxText: '기초체력증진',
    },
    {
      checkBoxItemID: '1124',
      checkBoxText: '다이어트',
    },
    {
      checkBoxItemID: '1125',
      checkBoxText: '근력향상',
    },
    {
      checkBoxItemID: '1126',
      checkBoxText: '재활',
    },
    {
      checkBoxItemID: '1127',
      checkBoxText: '체형교정',
    },
    {
      checkBoxItemID: '1128',
      checkBoxText: '근육량증가',
    },
  ];

  const [cityInfo, setCityInfo] = useState('시/도');
  const [districtInfo, setDistrictInfo] = useState('군/구');

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: 0px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  const Modal = styled.div`
    width: 390px;
    height: 100%;
    background-color: #fff;
    position: fixed;
    z-index: 1000;
    text-align: center;

    form {
      margin: 0 20px;
    }
  `;

  const ModalTitle = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 22px;
    align-items: center;

    &::before {
      content: '';
      display: inline-block;
      width: 11px;
    }

    h2 {
      font-weight: 700;
      font-size: 18px;
      line-height: 31px;
    }
  `;

  const CloseButton = styled.button`
    display: inline-block;
    background-color: transparent;
    border: none;
    cursor: pointer;
  `;

  const FormSection = styled.section`
    margin-bottom: 10px;
    position: relative;

    h2 {
      text-align: left;
      font-weight: 700;
      font-size: 16px;
      line-height: 31px;
    }

    .section-descript {
      position: absolute;
      top: 0;
      font-weight: 700;
      font-size: 8px;
      line-height: 31px;
      color: #8b8b8b;
      left: 45px;
    }
  `;

  const PositionList = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    gap: 8px;
  `;

  const SaveButton = styled.button`
    width: 335px;
    height: 47px;
    background: ${(props) => props.theme.purple};
    border-radius: 10px;
    color: #fff;
    border: none;
    cursor: pointer;
    text-align: center;
    margin-top: 10px;
    font-weight: 500;
    font-size: 17px;
    line-height: 25px;
  `;

  return (
    <>
      <Modal>
        <ModalTitle>
          <h2>상세 옵션</h2>
          <CloseButton onClick={() => onChangeSetState(!isModalState)}>
            <Image
              src="/assets/common/closeButton.svg"
              alt="상세 옵션 닫기"
              width={11}
              height={13}
            />
          </CloseButton>
        </ModalTitle>
        <form>
          <fieldset>
            <legend className="srOnly">상세 옵션</legend>
            <FormSection>
              <h2>위치</h2>
              <PositionList>
                <Select
                  currentSelectedData={cityInfo}
                  onSetCurrentSelected={setCityInfo}
                  selectData={city}
                  selectWidth={150}
                />
                <Select
                  currentSelectedData={districtInfo}
                  onSetCurrentSelected={setDistrictInfo}
                  selectData={
                    districtInfo === '군/구' ? ['시/도를 선택해주세요'] : district[districtInfo]
                  }
                  selectWidth={190}
                />
              </PositionList>
            </FormSection>
            <FormSection>
              <h2>성별</h2>
              <Radio notSelected={true} />
            </FormSection>
            <FormSection>
              <h2>종목</h2>
              <span className="section-descript">중복 선택이 가능합니다.</span>
              <OptionCheckBox checkBoxList={fieldList} />
            </FormSection>
            <FormSection>
              <h2>목적</h2>
              <span className="section-descript">중복 선택이 가능합니다.</span>
              <OptionCheckBox checkBoxList={purposeList} />
            </FormSection>
            <FormSection>
              <h2>가격</h2>
              <label htmlFor="optionPrice">시간 당 3만원</label>
              <input type="range" id="optionPrice" />
            </FormSection>
            <FormSection>
              <h2>경력</h2>
              <label htmlFor="optionCareers">경력 2년</label>
              <input type="range" id="optionCareers" />
            </FormSection>
            <SaveButton onClick={onChangeSetState}>변경 사항 저장</SaveButton>
          </fieldset>
        </form>
      </Modal>
    </>
  );
};

export default DetailOption;
