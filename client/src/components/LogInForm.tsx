import {User} from '@/types/custom_types';
import {FaGithub, FaGoogle} from 'react-icons/fa';
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
    last_seen: new Date(),
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
        await router.push(`/`);
        location.reload();

        console.log('Result of login successfully:', result);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="mt-8 w-96 rounded-2xl bg-[#EDE9E6] p-10">
      <form onSubmit={handleLogin}>
        <div className="flex  w-full flex-col">
          <label
            className="mb-1 ml-1 font-medium text-[#6741D9]"
            htmlFor="email"
          >
            Email{' '}
          </label>
          <input
            className="shadow-custom  rounded-2xl bg-[#EDE9E6] p-2"
            onChange={handleLogInInput}
            type="email"
            name="email"
            placeholder="email"
            required
          />

          <br />
          <label
            className="mb-1 ml-1 font-medium text-[#6741D9]"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow-custom  rounded-2xl bg-[#EDE9E6] p-2"
            onChange={handleLogInInput}
            type={passwordType}
            name="password"
            placeholder="password"
            required
          />
        </div>
        <br />
        <button
          type="submit"
          className="rounded-full bg-black px-4 py-2 font-bold text-white hover:bg-[#B197FC]"
        >
          login
        </button>
      </form>

      <button
        className="relative -right-60 -top-28 p-4"
        onClick={changePasswordType}
      >
        {' '}
        {showOrHide}
      </button>
      <br />
      <button
        onClick={() => {
          signIn('github', {
            redirect: false,
          });
        }}
        className="rounded border-b-4 border-[#D9D9D9] bg-[#6741D9] px-4 py-2 font-bold text-white hover:border-black hover:bg-[#9AFF80] hover:text-black"
      >
        <FaGithub style={{fontSize: '2em'}} />
        log in with Github
      </button>
      {/* <br />
      <br />
      <button className=" rounded border-b-4 border-[#6741D9] bg-[#D9D9D9] px-4 py-2 font-bold text-[#6741D9] hover:border-black hover:bg-[#9AFF80] hover:text-black">
        <FaGoogle style={{fontSize: '2em'}} />
        log in with Google
      </button> */}
    </div>
  );
}

export default LogInForm;
