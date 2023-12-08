import Link from 'next/link';
import React from 'react';

type Props = {};

function CodaskSidebar({}: Props) {
  return (
    <>
      <section className="fixed h-full w-48 bg-gray-200 ">
        <div className="mx-4 my-10">
          <h3 className="text-lg font-bold text-pink-500">Search by: </h3>
          <ul>
            <li>
              <Link href={'/search/question'}>Questions</Link>
            </li>
            <li>
              <Link href={'/search/tags'}>Tags</Link>
            </li>
            <li>
              <Link href={'/search/modules'}>Modules</Link>
            </li>
          </ul>
        </div>
        <div className="mx-4 my-20">
          <h3 className="text-lg font-bold text-pink-500">Discover: </h3>
          <ul>
            <li>
              <Link href={'/discover/studentProjects'}>Student Projects</Link>
            </li>
            <li>
              <Link href={'/discover/polls'}>Polls</Link>
            </li>
            <li>
              <Link href={'/discover/discussions'}>Discussions</Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default CodaskSidebar;
