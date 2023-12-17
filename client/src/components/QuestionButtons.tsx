import Link from 'next/link';
import React, {useState} from 'react';
import Modal from './Modal';
import Image from 'next/image';

function QuestionButtons() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col">
      <Link
        className="my-2 rounded-full bg-black px-4 py-2 font-bold text-white no-underline hover:bg-[#B197FC]"
        href={'/search/questions/askQuestion'}
      >
        Ask a question
      </Link>
      <button
        className="my-2 mb-3 rounded-full bg-[#B197FC] px-4 py-2 font-medium text-white hover:bg-black"
        onClick={handleShowModal}
      >
        Ask ChatGPT
      </button>
      {showModal && (
        <Modal
          image={
            <Image
              src="/RaulAvatarModal.png"
              width={150}
              height={150}
              alt="angryRaulAvatar"
            />
          }
          title="Señor Raúl says"
          message="You should never ask ChatGPT!!!"
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default QuestionButtons;
