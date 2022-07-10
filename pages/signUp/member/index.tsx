import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { CityAndDistrictSelect } from '@components/common/select';
import StepHeader from '@components/layout/signUp/StepHeader';

import { signUpMember } from 'api/firebase';
import { FixedBottomButton } from '@components/common/button';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { CheckIsValidNickname } from '@components/common/input';
import Router from 'next/router';
import useCheckUserEmail from 'hooks/useCheckUserEmail';

const StyledStep = styled.div`
  margin: 40px 0 0 21px;

  label {
    display: block;
    margin-bottom: 10px;
  }

  .nickname {
    margin-bottom: 20px;
    position: relative;

    .correct-nickname,
    .duplicate-nickname,
    .incorrect-nickname {
      position: absolute;
      top: 3px;
      right: 30px;
      font-size: 12px;
    }

    .correct-nickname {
      color: #0088e0;
    }

    .duplicate-nickname,
    .incorrect-nickname {
      color: #f90c0c;
    }

    .both {
      top: -12px;
    }

    .nickname-img {
      position: absolute;
      top: 34px;
      right: 39px;
    }

    input {
      width: 321px;
      padding: 8px;
      border-radius: 10px;
      border: 1px solid ${({ theme }) => theme.lineGray};
    }
  }
`;

const Step1 = () => {
  const [cityInfo, setCityInfo] = useState('시/도');
  const [districtInfo, setDistrictInfo] = useState('군/구');
  const [checkNickname, setCheckNickname] = useState(false);
  const [nickname, setNickname] = useState('');
  const userInfo = useSelector((state: RootState) => state.userInfo.value);

  useEffect(() => {
    if (!userInfo.email) Router.push('/');
  }, []);

  const submitMemberInfo = async () => {
    try {
      await signUpMember({
        nickname: nickname,
        email: userInfo.email,
        gender: userInfo.gender,
        city: cityInfo,
        district: districtInfo,
      });
      Router.push('/signUp/member/complete');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form>
      <StepHeader
        mainAgent={'member'}
        titleStageNumber={1}
        subTitleStageComment={'간단한 기본 정보를 입력해주세요 :)'}
      />
      <StyledStep>
        <div className="nickname">
          <label>닉네임</label>
          <CheckIsValidNickname
            nickname={nickname}
            onSetNickname={setNickname}
            isCheckNickname={setCheckNickname}
          />
        </div>
        <div className="interestedArea">
          <label>관심 지역</label>
          <CityAndDistrictSelect
            cityInfo={cityInfo}
            districtInfo={districtInfo}
            onSetCityInfo={setCityInfo}
            onSetDistrictInfo={setDistrictInfo}
          />
        </div>
      </StyledStep>
      <FixedBottomButton
        isValid={checkNickname && cityInfo !== '시/도' && districtInfo !== '군/구' ? true : false}
        buttonType={'button'}
        buttonTitle="회원가입 완료"
        onButtonEvent={submitMemberInfo}
      />
    </form>
  );
};

export default Step1;
