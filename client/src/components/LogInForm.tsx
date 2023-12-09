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
        <FaGithub style={{fontSize: '2em'}} />
        log in with Github
      </button>
      <br />
      <br />
      <button className=" rounded border-b-4 border-[#6741D9] bg-[#D9D9D9] px-4 py-2 font-bold text-[#6741D9] hover:border-black hover:bg-[#9AFF80] hover:text-black">
        <FaGoogle style={{fontSize: '2em'}} />
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
