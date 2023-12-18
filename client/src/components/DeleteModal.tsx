import React, {useState} from 'react';

type ModalProps = {
  title: string;
  itemToDelete: string;
  onClose: () => void;
  confirmDel: () => void;
};

const DeleteModal = ({
  itemToDelete,
  onClose,
  title,
  confirmDel,
}: ModalProps) => {
  return (
    <div className="modal-background w-max">
      <div className="modal-content w-120">
        <div className="flex flex-row items-center justify-center border-b-4 border-[#6741D9] p-2">
          <h3 className="self-end text-xl font-bold text-black">
            Delete {itemToDelete}:{' '}
            <span className="text-xl font-normal">{title}</span>
          </h3>
        </div>
        <div className="m-4 items-center justify-center">
          <p className="message text-lg">
            Are you sure you want to delete this {itemToDelete}?
          </p>
        </div>
        <div className="mx-auto w-72">
          <button className="mx-2 !bg-green-500" onClick={onClose}>
            No! Keep it!
          </button>
          <button className="mx-2 !bg-red-500" onClick={confirmDel}>
            Yes I'm sure!
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
