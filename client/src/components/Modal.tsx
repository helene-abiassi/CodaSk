import Image from 'next/image';
import React, {useState} from 'react';

type ModalProps = {
  title: string;
  message: string;
  onClose: () => void;
};

const Modal = ({message, onClose, title}: ModalProps) => {
  return (
    <div className="modal-background">
      <div className="modal-content ">
        <button onClick={onClose}>x</button>
        <h3>{title}</h3>

        <div className="flex flex-col items-center justify-center">
          {/* <Image
            src={`/RaulAvatarModal.png`}
            width={150}
            height={150}
            alt="angryRaulAvatar"
          /> */}
          <br />
          <p className="message text-xl">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
