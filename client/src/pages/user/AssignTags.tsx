import Link from 'next/link';
import React, {ChangeEvent} from 'react';

type Props = {};

function AssignTags({
  filteredTags,
  selectedTags,
  setSelectedTags,
  handleTagUpdate,
  questionUpdateCalled,
  tagUpdateCalled,
  questionUpdateErr,
  tagUpdateError,
}: Props) {
  const handleTagSelection = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const tempArr = [...selectedTags];
      tempArr.push(e.target.value);
      setSelectedTags(tempArr);
    } else {
      const tempArr = [...selectedTags];
      const indInArr = tempArr.indexOf(e.target.value);
      tempArr.splice(indInArr, 1);
      setSelectedTags(tempArr);
    }
  };

  return (
    <>
      {!questionUpdateCalled && !tagUpdateCalled ? (
        <>
          <p>Please select a tag:</p>

          <div className="flex flex-wrap">
            {filteredTags &&
              filteredTags.map((tag) => {
                return (
                  <>
                    <div className="m-1 rounded-lg border-2 border-[#6741D9] bg-[#EDE9E6] p-1 text-[#6741D9]">
                      <input
                        type="checkbox"
                        id={tag.name}
                        name={tag.name}
                        value={tag.id}
                        onChange={handleTagSelection}
                      />
                      <label htmlFor="html" className="p-1">
                        {tag.name}
                      </label>
                    </div>
                  </>
                );
              })}
          </div>

          <button
            className="mx-1 my-1 block rounded-xl bg-black px-3 py-[0.10rem] text-white"
            onClick={handleTagUpdate}
          >
            Add tags
          </button>
        </>
      ) : !questionUpdateErr && !tagUpdateError ? (
        <>
          <p>Congratulations, everything went well!</p>
          <Link
            href={'/'}
            className="mx-1 hover:font-semibold focus:font-semibold"
          >
            {' '}
            Take me to all questions{' '}
          </Link>
        </>
      ) : (
        <>
          <p>{questionUpdateErr.message}</p>
          <p>{tagUpdateError.message}</p>
        </>
      )}
    </>
  );
}

export default AssignTags;
