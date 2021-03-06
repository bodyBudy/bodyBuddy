import Image from 'next/image';
import Link from 'next/link';

import profile from '@assets/common/profile.svg';
import setting from '@assets/common/setting-black.svg';
import right from '@assets/common/right-black.svg';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { useEffect, useState } from 'react';
import { getMemberReviewsByEmail } from '@api/firebase';

const StyledProfile = styled.div`
  padding-top: 40px;

  h2 {
    color: ${({ theme }) => theme.purple};
    padding: 21px;
  }

  .profile {
    width: 90%;
    background-color: #f8f8f8;
    border-radius: 10px;
    position: relative;
    padding: 25px 0;
    margin: 0 auto;

    .profile-edit {
      position: absolute;
      right: 15px;
      top: 10px;
    }

    .profile-info {
      display: flex;
      justify-content: space-evenly;
      align-items: center;

      span:first-of-type {
        font-size: 20px;
      }

      span {
        display: block;
        line-height: 1.2;
      }
    }

    .logout {
      font-size: 12px;
      cursor: pointer;
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
  }

  .review {
    width: 90%;
    margin: 0 auto;
    border: 1px solid ${({ theme }) => theme.lineGray};
    border-radius: 10px;

    li:first-of-type {
      border-top: 1px solid ${({ theme }) => theme.lineGray};
    }

    .review-title {
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .review-count {
        color: ${({ theme }) => theme.purple};
      }
    }

    .review-content {
      border-bottom: 1px solid ${({ theme }) => theme.lineGray};
      padding: 10px 0;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .img-wrapper {
        width: 56px;
        height: 60px;
        border-radius: 100%;
        overflow: hidden;
      }
    }

    .trainer {
      span {
        display: block;
        font-size: 14px;
        line-height: 1.5;
      }

      span:first-of-type {
        color: #464646;
        font-size: 12px;
      }
    }

    .review-content:last-of-type {
      border: none;
    }

    .date {
      font-size: 12px;
      color: #9d9595;
    }
  }

  .community {
    padding: 10px 20px;
    width: 90%;
    margin: 20px auto;
    border: 1px solid ${({ theme }) => theme.lineGray};
    border-radius: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

interface trainerType {
  name?: string;
  images?: any;
  purpose?: string;
  field?: string;
}

interface reviewType {
  category?: string;
  content?: string;
  isActivation?: boolean;
  trainer: trainerType;
  trainerId?: string;
  userId?: string;
  creationDate?: any;
}

const Profile = () => {
  const userInfo = useSelector((state: RootState) => state.userSlice.value);
  const [reviewList, setReviewList] = useState<reviewType[] | undefined>([]);

  const getReviews = async () => {
    const list = await getMemberReviewsByEmail();
    setReviewList(list);

    try {
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <StyledProfile>
      <section className="profile">
        <h2 className="srOnly">?????????</h2>
        <div className="profile-edit">
          <Link href="/">
            <a>
              <Image src={setting} alt="????????? ??????" width="20px" height="22px" />
            </a>
          </Link>
        </div>
        <div className="profile-info">
          <Image src={profile} alt="????????? ?????????" width="123px" height="127px" />
          <div>
            <span>{userInfo.name}</span>
            <span>{userInfo.email}</span>
          </div>
        </div>
        <a className="logout">????????????</a>
      </section>
      <h2>?????? ??????</h2>
      <ul className="review">
        <div className="review-title">
          <h3>
            ?????? <span className="review-count">{reviewList ? reviewList.length : 0}</span>
          </h3>
          {reviewList ? (
            <Link href="/profile/posts">
              <a>
                <Image src={right} alt="?????????" width="15px" height="15px" />
              </a>
            </Link>
          ) : (
            <></>
          )}
        </div>
        {reviewList?.slice(0, 2).map(({ trainerId, trainer, creationDate }) => (
          <li className="review-content" key={`${trainerId}+${creationDate}`}>
            <div className="img-wrapper">
              <Image src={trainer.images[0]} width="60px" height="60px" />
            </div>
            <div className="trainer">
              <span>{trainer.name} ????????????</span>
              <span>
                {trainer.field} | {trainer.purpose}
              </span>
            </div>
            <div className="date">
              {creationDate.getFullYear()}.
              {creationDate.getMonth() < 10
                ? `0${creationDate.getMonth()}`
                : creationDate.getMonth()}
            </div>
          </li>
        ))}
      </ul>
      <div className="community">
        <h3>????????????</h3>
        <Link href="/">
          <a>
            <Image src={right} alt="?????????" width="15px" height="15px" />
          </a>
        </Link>
      </div>
    </StyledProfile>
  );
};

export default Profile;
