import { FixedBottomLinkButton } from '@components/common/button';
import { Select } from '@components/common/select';
import { ImageUploader } from '@components/common/uploader';
import StepHeader from '@components/layout/signUp/StepHeader';
import { healthEvents, healthPurpose } from '@data';
import styled from '@emotion/styled';
import React, { useState } from 'react';

const StyledStep = styled.section`
  margin: 40px 0 0 21px;
  padding-bottom: 100px;

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
  const [events, setEvents] = useState('종목');
  const [purpose, setPurpose] = useState('분야');
  const [commentLen, setCommentLen] = useState(0);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [profileImg, setProfileImg] = useState([]);

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
        subTitleStageComment={'트레이너님에 대해 알려주세요!'}
      />
      <StyledStep>
        <div className="name">
          <label>이름</label>
          <span>실명으로 작성해주세요 :{`)`}</span>
          <input type="text" onChange={onChangeInput} defaultValue={userName} />
        </div>
        <div className="purposeEvents">
          <label>종목 및 분야</label>
          <div>
            <Select
              currentSelectedData={events}
              selectData={healthEvents}
              selectWidth={142}
              onSetCurrentSelected={setEvents}
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
          <label>프로필 사진</label>
          <span> 트레이너님을 대표할 수 있는 사진을 업로드 해주세요 (최대 3장)</span>
          <ImageUploader url={profileImg} setImageUrl={setProfileImg} />
        </div>
        <div className="comment">
          <label>프로필 코멘트</label>
          {commentLen >= 20 ? (
            <span className="comment-guide">최대 20자를 초과했습니다!</span>
          ) : (
            <></>
          )}
          <textarea minLength={1} onChange={onChangeComment} defaultValue={comment} />
          <span className="comment-len">{commentLen}/20</span>
        </div>
      </StyledStep>
    </>
  );
};

export default Step1;
