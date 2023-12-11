import React, {ChangeEvent} from 'react';

type Props = {};

function AssignTags({
  filteredTags,
  selectedTags,
  setSelectedTags,
  handleTagUpdate,
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
      <p>Please select a tag:</p>
      {filteredTags &&
        filteredTags.map((tag) => {
          return (
            <>
              <input
                type="checkbox"
                id={tag.name}
                name={tag.name}
                value={tag.id}
                onChange={handleTagSelection}
              />
              <label htmlFor="html">{tag.name}</label>
            </>
          );
        })}

      <button
        className="mx-1 my-1 rounded-xl bg-black px-3 py-[0.10rem] text-white"
        onClick={handleTagUpdate}
      >
        Add tags
      </button>

      <p>Added successfully</p>
    </>
  );
}

export default AssignTags;
