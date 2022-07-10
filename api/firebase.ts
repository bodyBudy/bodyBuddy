import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, where, query, addDoc } from 'firebase/firestore/lite';
import { usertype } from './firebase.type';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MSG_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const userCollection = collection(db, 'user');

// 회원가입
export const checkIsNicknameDuplicated = async (nickname: string) => {
  try {
    let user = '';

    const q = query(userCollection, where('nickname', '==', nickname));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      user = doc.id;
    });

    if (user.length) {
      return true;
    }

    return false;
  } catch (e) {
    console.log(e);
  }
};

export const signUpMember = async ({ nickname, email, gender, city, district }: usertype) => {
  try {
    await addDoc(collection(db, 'user'), {
      nickname,
      email,
      gender,
      city,
      district,
    });
  } catch (e) {
    console.log(e);
  }
};
