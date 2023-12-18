import Image from 'next/image';
import React from 'react';

type Props = {};

function About({}: Props) {
  return (
    <div
      className="h-full bg-[#6741D9] text-white
  "
    >
      <div className="mb-2 flex flex-row justify-around border-b-2 border-blue-100 py-10 ">
        <ul>
          <p className="text-lg font-normal ">README.md</p>
          <br />
          <li>Quick Intro</li>
          <li>How to get started</li>
          <li>Documentation</li>
          <li>How to participate</li>
        </ul>
        <Image src={'/boo.png'} alt="about-page" width={250} height={250} />
      </div>
      <div className="mx-10 flex flex-col justify-around py-10 text-left ">
        <p className="text-xl font-normal text-white underline">Quick Intro:</p>
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
          porro enim accusamus quo, qui incidunt harum ducimus, esse ratione
          culpa eveniet aperiam? Eos nostrum aliquam veniam harum dolores.
          Numquam, quam laudantium libero dolor eaque pariatur asperiores
          tenetur nulla dignissimos possimus earum ducimus tempora, corporis
          architecto dolorem porro harum error quasi. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Pariatur, porro enim accusamus quo, qui
          incidunt harum ducimus, esse ratione culpa eveniet aperiam? Eos
          nostrum aliquam veniam harum dolores. Numquam, quam laudantium libero
          dolor eaque pariatur asperiores tenetur nulla dignissimos possimus
          earum ducimus tempora, corporis architecto dolorem porro harum error
          quasi.
        </p>
      </div>
      <div className="mx-10 flex flex-col justify-around py-10 text-left ">
        <p className="text-xl font-normal text-white underline">
          How to get started:
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
          porro enim accusamus quo, qui incidunt harum ducimus, esse ratione
          culpa eveniet aperiam? Eos nostrum aliquam veniam harum dolores.
          Numquam, quam laudantium libero dolor eaque pariatur asperiores
          tenetur nulla dignissimos possimus earum ducimus tempora, corporis
          architecto dolorem porro harum error quasi. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Pariatur, porro enim accusamus quo, qui
          incidunt harum ducimus, esse ratione culpa eveniet aperiam? Eos
          nostrum aliquam veniam harum dolores. Numquam, quam laudantium libero
          dolor eaque pariatur asperiores tenetur nulla dignissimos possimus
          earum ducimus tempora, corporis architecto dolorem porro harum error
          quasi.
        </p>
      </div>
      <div className="mx-10 flex flex-col justify-around py-10 text-left ">
        <p className="text-xl font-normal text-white underline">
          Documentation:
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
          porro enim accusamus quo, qui incidunt harum ducimus, esse ratione
          culpa eveniet aperiam? Eos nostrum aliquam veniam harum dolores.
          Numquam, quam laudantium libero dolor eaque pariatur asperiores
          tenetur nulla dignissimos possimus earum ducimus tempora, corporis
          architecto dolorem porro harum error quasi. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Pariatur, porro enim accusamus quo, qui
          incidunt harum ducimus, esse ratione culpa eveniet aperiam? Eos
          nostrum aliquam veniam harum dolores. Numquam, quam laudantium libero
          dolor eaque pariatur asperiores tenetur nulla dignissimos possimus
          earum ducimus tempora, corporis architecto dolorem porro harum error
          quasi.
        </p>
      </div>
      <div className="mx-10 flex flex-col justify-around py-10 text-left ">
        <p className="text-xl font-normal text-white underline">
          How to participate:
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
          porro enim accusamus quo, qui incidunt harum ducimus, esse ratione
          culpa eveniet aperiam? Eos nostrum aliquam veniam harum dolores.
          Numquam, quam laudantium libero dolor eaque pariatur asperiores
          tenetur nulla dignissimos possimus earum ducimus tempora, corporis
          architecto dolorem porro harum error quasi. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Pariatur, porro enim accusamus quo, qui
          incidunt harum ducimus, esse ratione culpa eveniet aperiam? Eos
          nostrum aliquam veniam harum dolores. Numquam, quam laudantium libero
          dolor eaque pariatur asperiores tenetur nulla dignissimos possimus
          earum ducimus tempora, corporis architecto dolorem porro harum error
          quasi.
        </p>
      </div>
      <br />
    </div>
  );
}

export default About;
