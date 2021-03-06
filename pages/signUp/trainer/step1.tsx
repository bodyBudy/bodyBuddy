import { FixedBottomButton } from '@components/common/button';
import { Select } from '@components/common/select';
import { ImageUploader } from '@components/common/uploader';
import StepHeader from '@components/layout/signUp/StepHeader';
import { healthEvents, healthPurpose } from '@data';
import styled from '@emotion/styled';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { trainerSignUpstep1 } from 'redux/trainerSlice';

const StyledStep = styled.section`
  margin: 40px 0 0 21px;
  padding-bottom: 55px;

  label {
    display: block;
    margin-bottom: 10px;
  }
  .purposeEvents {
    margin-bottom: 30px;

    div {
      display: flex;
      span:first-of-type {
        margin-right: 10px;
      }
    }
  }

  .name {
    margin-bottom: 15px;
    span {
      display: block;
      font-size: 12px;
      margin-bottom: 10px;
      color: #888787;
    }

    input {
      border: 1px solid ${({ theme }) => theme.lineGray};
      border-radius: 15px;
      width: 350px;
      box-sizing: border-box;
      padding: 7px 10px;
    }
  }

  .profile {
    margin-bottom: 30px;

    label {
      margin-bottom: 10px;
    }

    span {
      display: block;
      font-size: 12px;
      margin-bottom: 10px;
      color: #888787;
    }

    div {
      position: relative;
      left: -5px;
    }
  }

  .comment {
    position: relative;

    .comment-guide {
      font-size: 12px;
      color: #f90c0c;
      position: absolute;
      right: 21px;
      top: 2px;
    }

    .comment-len {
      position: absolute;
      bottom: 10px;
      right: 33px;
      font-size: 11px;
      color: #888787;
    }

    textarea {
      box-sizing: border-box;
      padding: 10px;
      width: 350px;
      height: 70px;
      border: 1px solid ${({ theme }) => theme.lineGray};
      border-radius: 10px;
      display: block;
      resize: none;
    }
  }
`;

const Step1 = () => {
  const dispatch = useDispatch();
  const [field, setField] = useState('??????');
  const [purpose, setPurpose] = useState('??????');
  const [commentLen, setCommentLen] = useState(0);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [profileImg, setProfileImg] = useState(['', '', '']);
  const [isValidButton, setIsValidButton] = useState(false);

  useEffect(() => {
    if (
      field !== '??????' &&
      purpose !== '??????' &&
      commentLen >= 1 &&
      commentLen <= 20 &&
      profileImg[0] !== '' &&
      userName.length >= 1
    ) {
      setIsValidButton(true);
    } else {
      setIsValidButton(false);
    }
  }, [field, purpose, commentLen, userName, profileImg]);

  const onClickNextStep = () => {
    const payload = {
      name: userName,
      field,
      purpose,
      introduction: comment,
      images: profileImg,
    };

    dispatch(trainerSignUpstep1(payload));

    Router.push('/signUp/trainer/step2');
  };

  const onChangeInput = (e: React.SyntheticEvent) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    setUserName(e.target.value);
  };

  const onChangeComment = (e: React.SyntheticEvent) => {
    if (!(e.target instanceof HTMLTextAreaElement)) return;

    setComment(e.target.value);
    setCommentLen(e.target.value.length);
  };

  return (
    <>
      <StepHeader
        mainAgent={'trainer'}
        titleStageNumber={1}
        subTitleStageComment={'?????????????????? ?????? ???????????????!'}
      />
      <StyledStep>
        <div className="name">
          <label>??????</label>
          <span>???????????? ?????????????????? :{`)`}</span>
          <input type="text" onChange={onChangeInput} defaultValue={userName} />
        </div>
        <div className="purposeEvents">
          <label>?????? ??? ??????</label>
          <div>
            <Select
              currentSelectedData={field}
              selectData={healthEvents}
              selectWidth={142}
              onSetCurrentSelected={setField}
            />
            <Select
              currentSelectedData={purpose}
              selectData={healthPurpose}
              selectWidth={142}
              onSetCurrentSelected={setPurpose}
            />
          </div>
        </div>
        <div className="profile">
          <label>????????? ??????</label>
          <span> ?????????????????? ????????? ??? ?????? ????????? ????????? ???????????? (?????? 3???)</span>
          <ImageUploader url={profileImg} setImageUrl={setProfileImg} />
        </div>
        <div className="comment">
          <label>????????? ?????????</label>
          {commentLen >= 20 ? (
            <span className="comment-guide">?????? 20?????? ??????????????????!</span>
          ) : (
            <></>
          )}
          <textarea minLength={1} onChange={onChangeComment} defaultValue={comment} />
          <span className="comment-len">{commentLen}/20</span>
        </div>
      </StyledStep>
      <FixedBottomButton
        isValid={isValidButton}
        buttonTitle={'??????'}
        buttonType={'button'}
        onButtonEvent={onClickNextStep}
      />
    </>
  );
};

export default Step1;
