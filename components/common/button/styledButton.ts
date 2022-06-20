import styled from '@emotion/styled';

export const StyledGradientBackground = styled.a`
  display: flex;
  position: absolute;
  width: 326px;
  height: 43px;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(180deg, #70b4e0 0%, #858ff1 100%);
  border-radius: 5px;
  cursor: pointer;
  justify-content: center;
  align-items: center;

  color: white;
  font-weight: 700;
  font-size: 19px;
`;

export const StyledFixedLinkButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 77px;
  position: absolute;
  bottom: 0;
  font-size: 17px;
  cursor: pointer;
  background: ${({ theme }) => theme.purple};
  color: white;
`;

export const DisabledFixedLinkButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 77px;
  position: absolute;
  bottom: 0;
  font-size: 17px;
  background: #f1eded;
`;

export const StyledSocialButton = styled.div`
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 330px;
    height: 50px;
    cursor: pointer;
    border-radius: 12px;
    font-weight: 600;
  }
`;
export const StyledKakaoButton = styled.a`
  background-color: #fee500;
`;

export const StyledNaverButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 330px;
  height: 50px;
  cursor: pointer;
  border-radius: 12px;
  font-weight: 600;
  background-color: #4fa42b;
  color: white;
`;