import {User, UserPhoto} from '@/types/custom_types';
import Image from 'next/image';
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
      'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1701637366/codask/website_photos/user_photo_default_l0kcos.png',
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
  const [selectedFile, setSelectedFile] = useState<File | string>('');

  const [passwordType, setPasswordType] = useState('password');
  const [showOrHide, setShowOrHide] = useState('show');

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

  const router = useRouter();

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || '');
  };

  const handleFileSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append('user_photo', selectedFile);

    const requestOptions = {
      method: 'POST',
      body: formdata,
    };

    try {
      const response = await fetch(
        'http://localhost:5008/api/users/imageupload',
        requestOptions
      );
      const result = (await response.json()) as UserPhoto;
      setNewUser({...newUser, user_photo: result.user_photo});
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const handleRegisterInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({...newUser, [e.target.name]: e.target.value});
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {email, password, first_name, last_name} = newUser;
    if (first_name.trim() === '') {
      alert('First name cannot be empty');
      return;
    } else if (last_name.trim() === '') {
      alert('Last name cannot be empty');
      return;
    } else if (!email.includes('@') && password.length < 6) {
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
      urlencoded.append('first_name', newUser.first_name);
      urlencoded.append('last_name', newUser.last_name);
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
        const result = await response.json();
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
      <div className="signupForm">
        <button>sign up with Github</button>
        <br />
        <button>sign up with Google</button>
        <br />
        <hr />
        <br />
        <Image
          alt="user_photo"
          src={newUser.user_photo}
          width={100}
          height={100}
        />
        <form onSubmit={handleFileSubmit}>
          <label htmlFor="user_photo">
            <input
              onChange={handleFileInput}
              type="file"
              name="user_photo"
              id="user_photo"
            />
          </label>
          <br />
          <button className="rounded-full bg-black px-4 py-2 font-bold text-white hover:bg-[#B197FC]">
            upload
          </button>
        </form>

        <br />
        <br />
        <form onSubmit={handleRegister}>
          <label htmlFor="first_name">
            First name
            <input
              onChange={handleRegisterInput}
              type="text"
              name="first_name"
              id="first_name"
              placeholder="first name"
              required
            />
          </label>
          <label htmlFor="last_name">
            Last name
            <input
              onChange={handleRegisterInput}
              type="text"
              name="last_name"
              id="last_name"
              placeholder="last name"
              required
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              onChange={handleRegisterInput}
              type="text"
              name="email"
              id="email"
              placeholder="email"
              required
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              onChange={handleRegisterInput}
              type={passwordType}
              name="password"
              id="password"
              placeholder="password"
              required
            />
          </label>

          <br />
          <button className="rounded-full bg-black px-4 py-2 font-bold text-white hover:bg-[#B197FC]">
            sign up
          </button>
        </form>
        <button onClick={changePasswordType}> {showOrHide}</button>

        <p>
          Already have an account? <Link href={'/user/login'}>Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpForm;
