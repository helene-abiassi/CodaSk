import Link from 'next/link';
import React from 'react';

type Props = {};

function CodaskSidebar({}: Props) {
  return (
    <>
      <section className="fixed top-20 mt-10 h-full w-48 ">
        <div className="mx-4 my-10">
          <h3 className="mb-2 text-lg font-extralight">SEARCH BY: </h3>
          <ul className="list-none ">
            <li>
              <Link
                className="font-light no-underline"
                href={'/search/questions'}
              >
                Questions
              </Link>
            </li>
            <li>
              <Link className="font-light no-underline" href={'/search/tags'}>
                Tags
              </Link>
            </li>
            <li>
              <Link
                className="font-light no-underline"
                href={'/search/modules'}
              >
                Modules
              </Link>
            </li>
          </ul>
        </div>
        <hr />
        <div className="mx-4 my-10">
          <h3 className="mb-2 text-lg font-extralight">DISCOVER: </h3>
          <ul className="list-none">
            <li>
              <Link
                className="font-light no-underline"
                href={'/discover/studentprojects'}
              >
                Student Projects
              </Link>
            </li>
            <li>
              <Link
                className="font-light no-underline"
                href={'/discover/polls'}
              >
                Polls
              </Link>
            </li>
            <li>
              <Link
                className="font-light no-underline"
                href={'/discover/discussions'}
              >
                Discussions
              </Link>
            </li>
          </ul>
        </div>
        <hr />
        <div className="mx-4 my-10">
          <ul className="list-none">
            <li className="mb-5 text-lg font-extralight">
              <Link
                className=" no-underline"
                href={'/discover/studentProjects'}
              >
                CONNECT
              </Link>
            </li>
            <li className="mb-5 text-lg font-extralight">
              <Link className=" no-underline" href={'/discover/polls'}>
                ABOUT
              </Link>
            </li>
            <li className="mb-5 text-lg font-extralight">
              <Link className=" no-underline" href={'/discover/discussions'}>
                CONTACT
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default CodaskSidebar;
