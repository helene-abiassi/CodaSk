import {User, UserPhoto} from '@/types/custom_types';
import {useSession} from 'next-auth/react';
import Image from 'next/image';
import {useRouter} from 'next/router';
import React, {ChangeEvent, FormEvent, useState} from 'react';

function CompleteProfileForm() {
  const session = useSession();

  const id = session!.data?.user?.name;

  console.log('session :>> ', session);
  console.log('id :>> ', id);

  const cohortNames = [
    'Blue Ants',
    'Petrol Raccoons',
    'Salmon Pink Treehoppers',
    'Orange Pigs',
    'Coral Honey Badgers',
    'Purple Phoenixes',
    'Cobalt Kangaroos',
    'Bronze Elephants',
    'Mint-Green Octopuses',
    'Orange Pumas',
    'Neon Narwhals',
    'Ginger Suricatas',
    'Rose Gold Quokkas',
    'Wine Red Cheetahs',

    'Indigo Honey Badgers',
    'Green Wombats',
    'Blue Puffer Fishes',
    'Pistachio Parrots',
    'White Flamingo',
    'Pink Eichhörnchen',
    'Grey Mambas',
    'Yellow Leopards',
  ];
  const studentTypes = ['Student', 'Graduate', 'Mentor'];

  const [userInfo, setuserInfo] = useState<User>({
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

  const router = useRouter();

  const handleInfoInput = (e: ChangeEvent<HTMLInputElement>) => {
    setuserInfo({...userInfo, [e.target.name]: e.target.value});
  };

  const handleDropdownInput = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log('e.target.value :>> ', e.target.value);
    setuserInfo({
      ...userInfo,
      user_permission: e.target.value,
      cohort_name: e.target.value,
    });
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setuserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleLocationInput = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setuserInfo({
      ...userInfo,
      location: {
        ...userInfo.location,
        [name]: value,
      },
    });
  };

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
      setuserInfo({...userInfo, user_photo: result.user_photo});
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const handleCompleteProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    try {
      const urlencoded = new URLSearchParams();
      urlencoded.append('_id', id!);
      urlencoded.append('first_name', userInfo.first_name);
      urlencoded.append('last_name', userInfo.last_name);
      urlencoded.append('user_photo', userInfo.user_photo);
      urlencoded.append('bio', userInfo.bio);
      urlencoded.append('country', userInfo.location.country);
      urlencoded.append('city', userInfo.location.city);
      urlencoded.append('course_type', userInfo.course_type);
      urlencoded.append('course_date', userInfo.course_date as string);
      urlencoded.append('cohort_name', userInfo.cohort_name);
      urlencoded.append('user_permission', userInfo.user_permission);
      urlencoded.append('website', userInfo.website);
      urlencoded.append('github', userInfo.github);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
      };

      try {
        const response = await fetch(
          'http://localhost:5008/api/users/completeProfile',
          requestOptions
        );
        console.log('response :>> ', response);
        if (response.ok) {
          const result = await response.json();
          console.log('result from update :>> ', result);
          setuserInfo(result);
          router.push(`../user/profile/${id}`);
        }
      } catch (error) {
        console.log('error in your /completeProfile route:>> ', error);
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <div className="mr-5">
          <Image
            alt="user_photo"
            src={userInfo.user_photo}
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-col">
          <form onSubmit={handleFileSubmit}>
            <label htmlFor="user_photo">
              <input onChange={handleFileInput} type="file" name="user_photo" />
            </label>
            <br />
            <button className="mt-4 rounded-full bg-black px-4 py-2 font-bold text-white hover:bg-[#B197FC]">
              upload
            </button>
          </form>
        </div>
      </div>
      <br />
      <br />
      <form
        className="flex flex-col justify-center"
        onSubmit={handleCompleteProfile}
      >
        <div className="flex flex-row ">
          <div className="flex w-full flex-col">
            <label
              className="mb-1 ml-1 font-medium text-[#6741D9]"
              htmlFor="first_name"
            >
              first name{' '}
            </label>
            <input
              className="shadow-custom mb-6 rounded-2xl bg-[#EDE9E6] p-2"
              onChange={handleInfoInput}
              type="text"
              name="first_name"
              placeholder="first name"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              className="mb-1 ml-1 font-medium text-[#6741D9]"
              htmlFor="last_name"
            >
              last name{' '}
            </label>
            <input
              className="shadow-custom mb-6 rounded-2xl bg-[#EDE9E6] p-2"
              onChange={handleInfoInput}
              type="text"
              name="last_name"
              placeholder="last name"
              required
            />
          </div>
        </div>
        <br />

        <div className="flex flex-row justify-around">
          <div className="flex w-full flex-col">
            <label
              className="mb-1 ml-1 font-medium text-[#6741D9]"
              htmlFor="bio"
            >
              bio{' '}
            </label>
            <input
              className="shadow-custom mb-6 h-20  rounded-2xl bg-[#EDE9E6] p-2"
              onChange={handleInfoInput}
              type="text"
              name="bio"
              id="bio"
              placeholder="Write a short bio..."
            />
          </div>
        </div>

        <br />

        <div className="mb-10 flex flex-row justify-around">
          <div className="flex  w-full flex-col">
            <label
              className="mb-1 ml-1 font-medium text-[#6741D9]"
              htmlFor="city"
            >
              city{' '}
            </label>
            <input
              className="shadow-custom rounded-2xl bg-[#EDE9E6] p-2"
              onChange={handleLocationInput}
              type="text"
              name="city"
              placeholder="city"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              className="mb-1 ml-1 font-medium text-[#6741D9]"
              htmlFor="country"
            >
              country{' '}
            </label>
            <input
              className="shadow-custom  rounded-2xl bg-[#EDE9E6] p-2"
              onChange={handleLocationInput}
              type="text"
              name="country"
              placeholder="country"
              required
            />
          </div>
        </div>
        <div className="flex flex-row justify-around">
          <div className="flex w-full flex-col">
            <label
              className="mb-1 ml-1 font-medium text-[#6741D9]"
              htmlFor="github"
            >
              github{' '}
            </label>
            <input
              className="shadow-custom mb-6 rounded-2xl bg-[#EDE9E6] p-2"
              onChange={handleInfoInput}
              type="text"
              name="github"
              placeholder="github"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              className="mb-1 ml-1 font-medium text-[#6741D9]"
              htmlFor="website"
            >
              website{' '}
            </label>
            <input
              className="shadow-custom mb-6 rounded-2xl bg-[#EDE9E6] p-2"
              onChange={handleInfoInput}
              type="text"
              name="website"
              placeholder="website"
              required
            />
          </div>
        </div>
        <br />
        <hr />
        <br />
        <div className="flex  flex-row justify-center">
          <div className="flex flex-row ">
            <label
              className="mx-2 mb-1 font-medium text-[#6741D9]"
              htmlFor="user_permission"
            >
              you're a{' '}
            </label>
            <select
              className="mx-2 rounded-full bg-black px-2 font-medium text-white"
              onChange={handleDropdownInput}
              name="user_permission"
              id="user_permission"
              placeholder="student type"
            >
              <option value={'user_permission'}>student type</option>
              {studentTypes.map((optionValue, index) => (
                <option key={index} value={optionValue}>
                  {optionValue}
                </option>
              ))}
            </select>
            <span className="mx-2 font-medium text-[#6741D9]">in</span>
          </div>
          <div className="flex flex-col">
            <label
              className="mx-2 font-medium text-black"
              htmlFor="course_type"
            >
              <input
                className="mx-2 font-medium "
                onChange={handleRadioChange}
                type="radio"
                name="course_type"
                id="web_development"
                value="Web Development"
              />
              Web Development
            </label>
            <label
              className="mx-2 font-medium text-black"
              htmlFor="course_type "
            >
              <input
                className="mx-2 font-medium "
                onChange={handleRadioChange}
                type="radio"
                name="course_type"
                id="data_analytics"
                value="Data Analytics"
              />
              Data Analytics
            </label>
          </div>
        </div>
        <br />
        <br />

        <div className="flex flex-row justify-center">
          <label
            className="mx-2 font-medium text-[#6741D9]"
            htmlFor="cohort_name"
          >
            from the
            <select
              className="shadow-custom mb-6 w-36 rounded-2xl bg-[#EDE9E6] p-2 text-black"
              onChange={handleDropdownInput}
              name="cohort_name"
              id="cohort_name"
              placeholder="cohort name"
            >
              <option value={''}>cohort name</option>
              {cohortNames.map((optionValue, index) => (
                <option key={index} value={optionValue}>
                  {optionValue}
                </option>
              ))}
            </select>{' '}
          </label>
          <span className="mx-2 font-medium text-[#6741D9]">on</span>

          <div className="flex flex-col ">
            <label
              className="mx-2 text-[#6741D9]"
              htmlFor="course_date"
            ></label>
            <input
              className="shadow-custom mb-6 w-36 rounded-2xl bg-[#EDE9E6] p-2 font-medium"
              onChange={handleInfoInput}
              type="date"
              name=""
              id=""
            />
          </div>
        </div>
        <br />
        <button className=" rounded-full px-4 py-2 font-bold text-[#6741D9] hover:text-black ">
          save
        </button>
      </form>
    </div>
  );
}

export default CompleteProfileForm;
