import RatingGroup from '@components/common/rating';
import { TitleBar } from '@components/common/title';
import { Select } from '@components/common/select';
import { FixedBottomButton } from '@components/common/button';
import { NextPage } from 'next/types';
import { useRef, useState } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import { field, service } from '@data';
import { debounce } from 'lodash';
import Router, { useRouter } from 'next/router';
import { addReview, updateReview } from '@api/firebase';
import NoContent from '@components/common/noContent';

const ServiceGroup = styled.div`
  border-top: 1px solid ${({ theme }) => theme.lightGray};
  margin: 20px;
  padding-top: 20px;
  display: flex;
  gap: 20px;
  & > span:nth-of-type(1) {
    align-self: center;
  }
  span {
    font-size: 13px;
    color: ${({ theme }) => theme.black};
  }
  span:nth-of-type(2) {
    span {
      margin-left: 5px;
    }
  }
`;

const TrainerRating = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px 0;
`;
const TrainerProfile = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  gap: 10px;
  img {
    border-radius: 50%;
  }
`;
const TrainerInfo = styled.div`
  flex-grow: 1;
  span:nth-of-type(1),
  span:nth-of-type(2) {
    line-height: 1.4;
  }
  span:nth-of-type(1) {
    font-weight: bold;
  }
  span:nth-of-type(2)::before {
    content: '|';
    display: inline-block;
    margin: 0 10px 0 10px;
  }
  p {
    width: 200px;
    font-size: 13px;
    margin-top: 15px;
    line-height: 1.2;
    color: #5a5858;
  }
`;

const MainText = styled.div`
  padding-left: 20px;
  position: relative;
  width: 80%;
  height: 250px;
  textarea {
    padding: 3%;
    line-height: 1.6;
    width: 100%;
    height: 100%;
    resize: none;
    color: #5a5858;
    border-style: none;
    border-radius: 10px;
    background-color: #f2f2f2;
  }
  span:nth-of-type(1) {
    font-size: 13px;
    position: absolute;
    line-height: 1.6;
    bottom: 0;
    right: 0;
    color: #5a5858;
  }
`;
const Option = styled.div`
  margin: 30px 0 30px 20px;
  label:nth-of-type(1) {
    display: inline-block;
    margin-right: 10px;
    width: 20px;
    height: 20px;
    background: url('/assets/common/checkboxSquare.svg') no-repeat;
  }
  input {
    display: none;
    &:checked + label:nth-of-type(1) {
      background: url('/assets/common/checkboxSquare-checked.svg') no-repeat;
      background-position-y: -5px;
    }
    &:checked ~ label:nth-of-type(2) {
      color: ${({ theme }) => theme.purple};
    }
  }
`;

const Review: NextPage = ({ data }) => {
  const [category, setCategory] = useState('??????');
  const edited = data ? JSON.parse(data) : '';

  const mainText = useRef<HTMLTextAreaElement>(null);
  const rating = useRef<HTMLInputElement | null>(null);
  const isPrivateReview = useRef<HTMLInputElement>(null);
  const hint = useRef(null);
  const [isValid, changeValidState] = useState(edited.creationDate ? true : false);

  const left = { link: '/chat/list', src: '/assets/common/back-black.svg', alt: '????????????' };
  const right = { link: '/chat/list', src: '/assets/common/closeButton.svg', alt: '????????????' };

  const handleRating = (e: { target: HTMLInputElement | null }) => {
    if (!e.target || e.target.name !== 'rating') return;
    if (rating.current && 'checked' in rating.current) {
      rating.current.checked = true;
      rating.current = e.target;
    }
  };

  const handleTextChange = debounce(() => {
    if (!mainText || !mainText.current || !hint.current) return;
    hint.current.style.display = mainText.current.value.length >= 10 ? 'none' : ' block';
    mainText.current.value.length >= 10 ? changeValidState(true) : changeValidState(false);
  }, 300);

  const uploadPost = () => {
    if (!mainText || !mainText.current) return;
    const newData: reviewProps = {
      category,
      content: mainText.current.value,
      creationDate: edited.id ? new Date(edited.creationDate) : new Date(),
      isActivation: isPrivateReview.current ? isPrivateReview.current.checked : false,
      rating: rating.current ? +rating.current.value : 1,
      trainerId: edited.trainerId,
      userId: 'mqcMcOXqvJwGR20waScC',
    };

    edited.id ? addReview(newData) : updateReview(edited.id, newData);
    Router.push('/profile');
  };

  return (
    <section>
      <h2 className="srOnly">?????? ??????</h2>
      {edited.trainerId ? (
        <>
          <TitleBar right={right} />
          <TrainerProfile>
            <Image
              src={edited.images ? edited.images[0] : '/assets/community/blank.svg'}
              width={100}
              height={100}
            ></Image>
            <TrainerInfo>
              <span>{edited.fieldId}</span>
              <span>{edited.name}</span>
              <p>{edited.introduction}</p>
            </TrainerInfo>
          </TrainerProfile>
          <TrainerRating>
            <RatingGroup
              isEditingMode={true}
              onChangeRating={handleRating}
              width={15}
              height={15}
            />
          </TrainerRating>
          <ServiceGroup>
            <span>??????</span>
            <Select
              currentSelectedData={category}
              onSetCurrentSelected={setCategory}
              selectData={service}
              selectWidth={100}
            />
          </ServiceGroup>
          <form>
            <fieldset>
              <legend className="srOnly">??????</legend>
              <MainText>
                <textarea
                  ref={mainText}
                  onChange={handleTextChange}
                  defaultValue={edited && edited.content ? edited.content : ''}
                  placeholder="????????? ?????? ????????? ???????????????. :) &#13;&#10;??????????????? ????????? ?????? ?????? ??? ?????????????????? ????????? ?????????!"
                ></textarea>
                <span ref={hint} onChange={handleTextChange} className="hint">
                  ?????? ?????? 10???
                </span>
              </MainText>
              <Option>
                <input
                  ref={isPrivateReview}
                  defaultChecked={edited && edited.isActivation ? edited.isActivation : ''}
                  type="checkbox"
                  id="isPrivateReview"
                />
                <label htmlFor="isPrivateReview"></label>
                <label htmlFor="isPrivateReview">????????????????????? ?????????</label>
              </Option>
            </fieldset>
          </form>
          <FixedBottomButton
            isValid={isValid}
            buttonType="button"
            onButtonEvent={uploadPost}
            buttonTitle={'?????? ??????'}
          />
        </>
      ) : (
        <>
          <TitleBar left={left} centerTitle={'????????????'} />
          <NoContent title="??????!" subTitle="????????? ????????????" />
        </>
      )}
    </section>
  );
};

export const getServerSideProps = async (context: { query: { edited: editorProps } }) => {
  const { edited } = context.query;
  return {
    props: {
      data: edited ? edited : '',
    },
  };
};

export default Review;
