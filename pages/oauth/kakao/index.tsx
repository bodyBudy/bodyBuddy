import styled from '@emotion/styled';
import axios from 'axios';
import Router from 'next/router';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginEmail } from 'redux/userSlice';

import { TailSpin } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const REDIRECT_URI = 'http://localhost:3000/oauth/kakao';

const SpinContainer = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
`;

const KakaoLogin = () => {
  const dispatch = useDispatch();

  const getToken = async (code: string | null) => {
    try {
      const {
        data: { access_token },
      } = await axios({
        url: `https://kauth.kakao.com/oauth/token`,
        method: 'post',
        params: {
          grant_type: 'authorization_code',
          client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API,
          redirect_uri: REDIRECT_URI,
          code: code,
        },
      });

      getUserInfo(access_token);
    } catch (e) {
      console.log(e);
    }
  };

  const getUserInfo = async (access_token: string) => {
    try {
      const { data } = await axios({
        url: 'http://localhost:8000/oAuth/kakao',
        method: 'post',
        data: { access_token: access_token },
        withCredentials: true,
      });

      if (data.result) {
        // 회원 데이터가 있는 경우
        Router.push('/');
      } else {
        // 회원 데이터가 없는 경우
        const payload = {
          email: data.userInfo.email,
          gender: data.userInfo.gender === 'female' ? false : true,
        };
        dispatch(loginEmail(payload));
        Router.push('/signUp/checkCategory');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    getToken(code);
  }, []);

  return (
    <SpinContainer>
      <TailSpin height="70" width="70" color="#858FF1" ariaLabel="loading" />
    </SpinContainer>
  );
};

export default KakaoLogin;
