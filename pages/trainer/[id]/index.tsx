import type { NextPage } from 'next';
import { TrainerHeader } from '@components/layout/trainer/TrainerHeader';
import { useEffect, useState } from 'react';
import { TrainerBody } from '@components/layout/trainer/TrainerBody';

const Trainer: NextPage = () => {
  const [liked, setLiked] = useState(false);
  const login = 'trainer';

  useEffect(() => {
    // 트레이너 정보 받아오기
  }, []);

  const trainer = {
    id: 1234,
    online: false,
  };

  const address = '서울 강남구 강남대로 364 미왕빌딩 11층';
  const images = ['/assets/index/logo.svg', '/assets/common/profile.svg'];
  // career에서 isApproval이 true인 content만 뽑아서 전달하기
  const careers = ['아주대학교 축구부 졸업', '에버랜드 아마존 소울리스 출신'];

  // 리뷰 중, 현재 트레이너 아이디와 일치하는 리뷰 2개만 가져오기
  const reviews = [
    {
      id: 612151056,
      userId: 123456789,
      creationDate: new Date(),
      rating: 4,
      trainerId: 456789123,
      image: [],
      category: '상담',
      content: '친절하게 잘 해주셨어요~',
      isActivation: true,
    },
    {
      id: 612151757,
      userId: 123456789,
      creationDate: new Date(),
      rating: 5,
      trainerId: 456789123,
      image: ['/assets/common/profile.svg'],
      category: '상담',
      content: '친절하게 잘 해주셨어요~22',
      isActivation: true,
    },
  ];

  return (
    <div>
      <h1 className="srOnly">{'강사이름'} 트레이너 페이지</h1>
      <TrainerHeader state={login} trainer={trainer} liked={liked} onClickSetLiked={setLiked} />
      <TrainerBody careers={careers} reviews={reviews} address={address} images={images} />
    </div>
  );
};

export default Trainer;
