import {User} from '@/types/custom_types';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/router';
import React, {ChangeEvent, FormEvent, useState} from 'react';
// import {providers, signIn, getSession, csrfToken} from 'next-auth';
// {providers, csrfToken}
function LogInForm() {
  const [passwordType, setPasswordType] = useState('password');
  const [showOrHide, setShowOrHide] = useState('show');
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
  });

  const id = '656b4777d89e223b1e928c33';

  const router = useRouter();

  const changePasswordType = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      setShowOrHide('hide');
      console.log('hide console log :>> ');
      return;
    }
    setPasswordType('password');
    setShowOrHide('show');
    console.log('show console log :>> ');
  };

  const handleLogInInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        ...user,
        redirect: false,
      });

      if (result?.error) {
        console.error('Login failed:', result.error);
      } else {
        // router.push(`../user/moreinfo`);
        router.push(`/`);

        console.log('Result of login successfully:', result);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="m-24 max-w-xl rounded-2xl bg-[#EDE9E6] p-10">
      <br />

      <form onSubmit={handleLogin}>
        <label htmlFor="email">
          Email
          <input
            onChange={handleLogInInput}
            type="email"
            name="email"
            placeholder="email"
            required
          />
        </label>
        <br />
        <label htmlFor="password">
          Password
          <input
            onChange={handleLogInInput}
            type={passwordType}
            name="password"
            placeholder="password"
            required
          />
        </label>

        <button
          type="submit"
          className="rounded-full bg-black px-4 py-2 font-bold text-white hover:bg-[#B197FC]"
        >
          login
        </button>
      </form>
      <br />
      <button onClick={changePasswordType}> {showOrHide}</button>
      <br />
      <br />
      <button className="rounded border-b-4 border-[#D9D9D9] bg-[#6741D9] px-4 py-2 font-bold text-white hover:border-black hover:bg-[#9AFF80] hover:text-black">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 37 37"
          fill="none"
        >
          <g clip-path="url(#clip0_222_113)">
            <path
              d="M18.5 0C8.27875 0 0 8.27875 0 18.5C0 26.6863 5.29562 33.6006 12.6494 36.0519C13.5744 36.2137 13.9213 35.6587 13.9213 35.1731C13.9213 34.7337 13.8981 33.2769 13.8981 31.7275C9.25 32.5831 8.0475 30.5944 7.6775 29.5537C7.46937 29.0219 6.5675 27.38 5.78125 26.9406C5.13375 26.5938 4.20875 25.7381 5.75812 25.715C7.215 25.6919 8.25562 27.0562 8.6025 27.6112C10.2675 30.4094 12.9269 29.6231 13.9906 29.1375C14.1525 27.935 14.6381 27.1256 15.17 26.6631C11.0538 26.2006 6.7525 24.605 6.7525 17.5287C6.7525 15.5169 7.46938 13.8519 8.64875 12.5569C8.46375 12.0944 7.81625 10.1981 8.83375 7.65438C8.83375 7.65438 10.3831 7.16875 13.9213 9.55062C15.4012 9.13438 16.9738 8.92625 18.5463 8.92625C20.1188 8.92625 21.6913 9.13438 23.1713 9.55062C26.7094 7.14563 28.2588 7.65438 28.2588 7.65438C29.2763 10.1981 28.6287 12.0944 28.4438 12.5569C29.6231 13.8519 30.34 15.4937 30.34 17.5287C30.34 24.6281 26.0156 26.2006 21.8994 26.6631C22.57 27.2412 23.1481 28.3512 23.1481 30.0856C23.1481 32.56 23.125 34.5488 23.125 35.1731C23.125 35.6587 23.4719 36.2369 24.3969 36.0519C28.0697 34.8123 31.2612 32.4521 33.5221 29.3034C35.783 26.1548 36.9994 22.3763 37 18.5C37 8.27875 28.7213 0 18.5 0Z"
              fill="#D9D9D9"
            />
          </g>
          <defs>
            <clipPath id="clip0_222_113">
              <rect width="37" height="37" fill="white" />
            </clipPath>
          </defs>
        </svg>{' '}
        log in with Github
      </button>
      <br />
      <br />
      <button className=" rounded border-b-4 border-[#6741D9] bg-[#D9D9D9] px-4 py-2 font-bold text-[#6741D9] hover:border-black hover:bg-[#9AFF80] hover:text-black">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 37 37"
          fill="none"
        >
          <g clip-path="url(#clip0_222_115)">
            <path
              d="M35.9478 15.1657C36.1635 16.4075 36.2711 17.6656 36.2692 18.9259C36.2692 24.5545 34.2574 29.3136 30.7563 32.5349H30.7609C27.6991 35.3631 23.4904 37.0004 18.5 37.0004C13.5935 37.0004 8.88795 35.0513 5.41852 31.5818C1.9491 28.1124 0 23.4069 0 18.5004C0 13.5939 1.9491 8.88832 5.41852 5.41889C8.88795 1.94947 13.5935 0.000366246 18.5 0.000366246C23.0925 -0.0534187 27.5276 1.67192 30.8765 4.81499L25.5947 10.0967C23.6855 8.27675 21.1374 7.2801 18.5 7.32174C13.6738 7.32174 9.57375 10.5777 8.11225 14.9622C7.33735 17.2597 7.33735 19.7479 8.11225 22.0454H8.11919C9.58762 26.423 13.6808 29.679 18.5069 29.679C20.9998 29.679 23.1412 29.0407 24.8016 27.9122H24.7946C25.7587 27.2735 26.5834 26.4461 27.2189 25.4799C27.8545 24.5137 28.2876 23.4288 28.4923 22.2906H18.5V15.1681H35.9478V15.1657Z"
              fill="#6741D9"
            />
          </g>
          <defs>
            <clipPath id="clip0_222_115">
              <rect width="37" height="37" fill="white" />
            </clipPath>
          </defs>
        </svg>{' '}
        log in with Google
      </button>
      <br />
      <br />
      <hr />
      <br />
      <br />
    </div>
  );
}

export default LogInForm;
