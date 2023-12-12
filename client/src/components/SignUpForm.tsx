import {FaGithub, FaGoogle} from 'react-icons/fa';
import {User, UserPhoto} from '@/types/custom_types';
import {signIn} from 'next-auth/react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';

function SignUpForm() {
  const [newUser, setNewUser] = useState<User>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    user_photo:
      'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1701685725/codask/website_photos/user_photo_default.png',
    bio: '',
    location: {
      city: '',
      country: '',
    },
    course_type: '',
    course_date: Date(),
    cohort_name: '',
    user_permission: '',
    website: '',
    github: '',
    member_since: new Date(),
    last_seen: Date(),
    questions: [],
    answers: [],
    saved_tags: [],
  });

  const [passwordType, setPasswordType] = useState('password');
  const [showOrHide, setShowOrHide] = useState('show');

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

  const handleRegisterInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({...newUser, [e.target.name]: e.target.value});
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {email, password} = newUser;
    if (!email.includes('@') && password.length < 6) {
      alert(
        'Your email seems to be invalid. \n Your password should be at least 6 characters'
      );
      return;
    } else if (password.length < 6) {
      alert('Your password should be at least 6 characters');
      return;
    } else if (!email.includes('@')) {
      alert('Your email seems to be invalid');
      return;
    }

    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

      const urlencoded = new URLSearchParams();

      urlencoded.append('email', newUser.email);
      urlencoded.append('password', newUser.password);
      urlencoded.append('user_photo', newUser.user_photo);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
      };

      try {
        const response = await fetch(
          'http://localhost:5008/api/users/signup',
          requestOptions
        );
        if (response.ok) {
          const result = await response.json();
          console.log('result in register:>> ', result);

          setNewUser(result);
          alert('Thank you for signing up!  🤓');
          await signIn('credentials', {
            ...newUser,
            redirect: false,
          });
        }
        await router.push('../user/moreinfo');
        location.reload();
      } catch (error) {
        console.log('error in your /signup fetch:>> ', error);
      }
    } catch (error) {
      console.log('error when adding new user:>> ', error);
    }
  };

  useEffect(() => {
    setNewUser(newUser);
  }, []);

  return (
    <div>
      <div className="m-8 w-96 rounded-2xl bg-[#EDE9E6] p-10">
        <form onSubmit={handleRegister}>
          <div className="flex flex-col">
            <label
              className="mb-1 ml-1 font-medium text-[#6741D9]"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow-custom  rounded-2xl bg-[#EDE9E6] p-2"
              onChange={handleRegisterInput}
              type="text"
              name="email"
              placeholder="email"
              required
            />
            <br />
          </div>
          <div className="flex flex-col">
            <label
              className="mb-1 ml-1 font-medium text-[#6741D9]"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow-custom  rounded-2xl bg-[#EDE9E6] p-2"
              onChange={handleRegisterInput}
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
            sign up
          </button>
        </form>
        <button
          className="relative -right-60 -top-28 p-4"
          onClick={changePasswordType}
        >
          {' '}
          {showOrHide}
        </button>
        <hr />

        <button
          onClick={() => {
            signIn('github', {
              redirect: false,
            });
          }}
          className="w-max rounded border-b-4 border-[#D9D9D9] bg-[#6741D9] px-4 py-2 font-bold text-white hover:border-black hover:bg-[#9AFF80] hover:text-black"
        >
          <FaGithub style={{fontSize: '2em'}} />
          sign up with Github
        </button>
        <br />
        <br />
        {/* <button className=" rounded border-b-4 border-[#6741D9] bg-[#D9D9D9] px-4 py-2 font-bold text-[#6741D9] hover:border-black hover:bg-[#9AFF80] hover:text-black">
          <FaGoogle style={{fontSize: '2em'}} />
          sign up with Google
        </button> */}
      </div>
    </div>
  );
}

export default SignUpForm;
