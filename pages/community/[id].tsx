import type { NextPage } from 'next';
import Image from 'next/image';
import styled from '@emotion/styled';
import { TitleBar } from '@components/common/title';
import { CommentCount, PostMetaInfo } from '@components/common/meta';
import ButtonGroup from '@components/common/buttongroup';
import Comments from '@components/layout/community/Comment';

const UserProfile = styled.div`
  display: flex;
  padding: 0 0 15px 20px;
  gap: 10px;
`;

const MainText = styled.div`
  padding-left: 20px;

  p {
    padding: 2% 0;
    &:nth-of-type(1) {
      font-weight: bold;
      font-size: 16px;
    }
    &:nth-of-type(2) {
      margin-bottom: 5%;
    }
  }
`;

const UploadImage = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  margin-bottom: 20px;

  gap: 15px;
  img {
    object-fit: cover;
  }
`;

const PostingDetail: NextPage = () => {
  const userId = '밍망디';
  const post = {
    content: '요만한건데',
    creationDate: '2022-06-14T06:30:10.792Z',
    fieldId: 'QrcJU3p8uWBbL0J6mjNL',
    images: ['/assets/community/blank.svg'],
    title: '트쌤한테 먹을거 줘도 돼?',
    totalComments: 4,
    userId: '밍망디',
  };

  const left = { link: '/community', src: '/assets/common/back-black.svg', alt: '뒤로가기' };
  return (
    <section>
      <h2 className="srOnly">게시물 보기</h2>
      <TitleBar left={left} centerTitle="PT 게시판" />
      <UserProfile>
        <Image src="/assets/common/profile.svg" alt="프로필" width="50" height="50" />
        <PostMetaInfo
          nickname={post.userId}
          dateTime={new Date(post.creationDate)}
          className="post"
        ></PostMetaInfo>
        {userId === post.userId ? <ButtonGroup className="post" /> : ''}
      </UserProfile>
      <MainText>
        <p>{post.title}</p>
        <p>{post.content}</p>
        {post.images.length ? (
          <UploadImage>
            {post.images.map((src, index) => (
              <Image key={index} src={src} alt="첨부한 사진" width="250" height="150" />
            ))}
          </UploadImage>
        ) : (
          ''
        )}
        <CommentCount comment={post.totalComments}></CommentCount>
      </MainText>
      <Comments />
    </section>
  );
};

export default PostingDetail;
