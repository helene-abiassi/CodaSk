import Link from 'next/link';
import React, {useState} from 'react';
import Modal from './Modal';

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
        className="my-2 rounded-full bg-black px-4 py-2 font-bold text-white hover:bg-[#B197FC]"
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
          message="You should never ask ChatGPT!!!"
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default QuestionButtons;
