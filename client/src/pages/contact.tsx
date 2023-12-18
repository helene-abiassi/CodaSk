import Link from 'next/link';
import React from 'react';

type Props = {};

function Contact({}: Props) {
  return (
    <div className="flex h-screen items-start justify-center bg-[#6741D9] p-10">
      <div className=" w-max rounded-xl bg-[#EDE9E6] p-4 text-center  text-black">
        <h1 className=" mt-4 text-center font-medium text-[#6741D9] md:text-3xl">
          Contact us
        </h1>
        <p>You can reach us by phone, mail or just come to visit!</p>
        <br />
        <p>
          <strong>Adress: </strong>Erich-Weinert-Straße 145, 10409 Berlin
        </p>
        <br />

        <iframe
          className="ml-6 rounded-lg bg-[#6741D9] p-2"
          id="adress-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2426.3895300494523!2d13.440341686008981!3d52.54447854023895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84f446e0c53a1%3A0x27eac7eee50f967e!2sCode%20Academy%20Berlin!5e0!3m2!1spl!2sde!4v1690466346963!5m2!1spl!2sde"
          loading="lazy"
        ></iframe>

        <br />
        <div className="my-4 border-t-2 border-t-[#6741D9]">
          <p className="my-4 font-light">
            This website was developed by <br />
            Helene Abi Assi, Rafal Zajac, and Thair Orfali.
          </p>
          <Link
            target="_blank"
            className="rounded-full font-normal no-underline hover:bg-[#B197FC] hover:p-2 hover:text-white"
            href={'https://github.com/helene-abiassi/CodaSk'}
          >
            View our repo
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Contact;
