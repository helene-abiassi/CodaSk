import {User} from '@/types/custom_types';
import {useRouter} from 'next/router';
import React, {ChangeEvent, FormEvent, useState} from 'react';

function CompleteProfileForm() {
  const _id = '656cf289e4f0cbef9819865e';
  const cohortNames = [
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

  const handleCompleteProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    try {
      const urlencoded = new URLSearchParams();
      urlencoded.append('_id', _id);
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
        const result = await response.json();
        if (response.ok) {
          alert('Please log in!');
          router.push('../user/login');
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
      <div>
        <div className="moreInfoForm m-16 max-w-lg rounded-2xl bg-[#EDE9E6] p-10">
          <form onSubmit={handleCompleteProfile}>
            <label htmlFor="bio">
              Bio
              <input
                onChange={handleInfoInput}
                type="text"
                name="bio"
                id="bio"
                placeholder="Write a short bio..."
              />
            </label>
            <br />
            <br />
            <label htmlFor="city">
              City
              <input
                onChange={handleLocationInput}
                type="text"
                name="city"
                id="city"
                placeholder="city"
              />
            </label>
            <label htmlFor="country">
              Country
              <input
                onChange={handleLocationInput}
                type="text"
                name="country"
                id="country"
                placeholder="country"
              />
            </label>
            <br />
            <br />
            <label htmlFor="user_permission">
              You are a
              <select
                onChange={handleDropdownInput}
                name="user_permission"
                id="user_permission"
                placeholder="Student Type"
              >
                <option value={'user_permission'}>Student Type</option>

                {studentTypes.map((optionValue, index) => (
                  <option key={index} value={optionValue}>
                    {optionValue}
                  </option>
                ))}
              </select>
            </label>
            <span>in</span>
            <label htmlFor="course_type">
              <input
                onChange={handleRadioChange}
                type="radio"
                name="course_type"
                id="web_development"
              />
              Web Development
            </label>
            <label htmlFor="course_type">
              <input
                onChange={handleRadioChange}
                type="radio"
                name="course_type"
                id="data_analytics"
              />
              Data Analytics
            </label>
            <br />
            <br />

            <label htmlFor="cohort_name">
              <select
                onChange={handleDropdownInput}
                name="cohort_name"
                id="cohort_name"
                placeholder="Cohort name"
              >
                <option value={''}>Cohort name</option>

                {cohortNames.map((optionValue, index) => (
                  <option key={index} value={optionValue}>
                    {optionValue}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="course_date">
              Course start date
              <input onChange={handleInfoInput} type="date" name="" id="" />
            </label>
            <br />
            <br />
            <label htmlFor="github">
              Github{' '}
              <input
                onChange={handleInfoInput}
                type="text"
                name="github"
                id="github"
              />
            </label>
            <label htmlFor="website">
              Website{' '}
              <input
                onChange={handleInfoInput}
                type="text"
                name="website"
                id="website"
              />
            </label>

            <button className="rounded-full bg-black px-4 py-2 font-bold text-white hover:bg-[#B197FC]">
              continue
            </button>
          </form>
          <p>You can also set this up later in your profile!</p>
        </div>
      </div>
      <br />
    </div>
  );
}

export default CompleteProfileForm;
