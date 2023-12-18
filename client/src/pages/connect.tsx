import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import {GetServerSideProps} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {FaGithub} from 'react-icons/fa';

export type userQuery = {
  getAllUsers: [
    {
      id: string;
      course_type: string;
      first_name: string;
      github: string;
      last_name: string;
      user_photo: string;
      user_permission: string;
    },
  ];
};

type ComponentProps = {
  data: userQuery;
};

const GET_USERS = gql`
  query getAllUsers {
    getAllUsers {
      course_type
      first_name
      github
      last_name
      user_photo
      user_permission
      id
    }
  }
`;

export const getServerSideProps: GetServerSideProps<
  ComponentProps
> = async () => {
  const client = new ApolloClient({
    uri: 'http://localhost:5008/graphql',
    cache: new InMemoryCache(),
  });

  const {data} = await client.query({
    query: GET_USERS,
  });
  // console.log('data :>> ', data);

  return {
    props: {
      data: data,
    },
  };
};

function Connect({data}: ComponentProps) {
  console.log('data :>> ', data);
  //!Make divs clickable and redirect to profile

  return (
    <div className="flex h-screen items-start justify-center bg-[#6741D9] p-4">
      <div className="flex flex-col">
        <h1 className=" mx-4 mt-4 text-center font-medium text-white md:text-3xl">
          Get in touch with {data.getAllUsers.length} Codac <br />
          students, graduates, and mentors!
        </h1>
        <div className="my-4 flex flex-row ">
          {data &&
            data.getAllUsers?.map((user, userIndex) => {
              return (
                <div className="mx-8 my-2 flex flex-col items-center justify-center rounded-lg p-4">
                  <Image
                    className="relative -bottom-8 rounded-full pb-2"
                    src={user?.user_photo}
                    alt="user-photo"
                    width={135}
                    height={135}
                  />
                  <div className="rounded-xl bg-black p-4 text-center text-white">
                    <br />
                    <p>
                      {user?.first_name} {user?.last_name}
                    </p>
                    <br />
                    <p>{user?.course_type}</p>
                    <div className="m-1 my-2 flex flex-row text-[#B197FC]">
                      <FaGithub style={{fontSize: '1.5em'}} />
                      <Link
                        className="ml-1 no-underline"
                        href={user?.github}
                        target="_blank"
                      >
                        Github profile
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Connect;
