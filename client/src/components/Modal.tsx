import Image from 'next/image';
import React, {ReactElement, useState} from 'react';

type ModalProps = {
  title: string;
  message: ReactElement[] | string;
  onClose: () => void;
  image?: JSX.Element;
};

const Modal = ({message, onClose, title, image}: ModalProps) => {
  return (
    <div className="modal-background w-max">
      <div className="modal-content w-80">
        <div className="flex flex-row items-center justify-center border-b-4 border-[#6741D9] p-2">
          <h3 className="self-end text-lg font-bold text-black">{title}</h3>
          <button onClick={onClose} className="self-start">
            x
          </button>
        </div>

        <div className="m-4 flex flex-col items-center justify-center">
          {image && <div className="image-container">{image}</div>}

          <br />
          <p className="message text-center text-xl">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
