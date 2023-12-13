import React from 'react';
import {FaSearch} from 'react-icons/fa';
import {FaDeleteLeft} from 'react-icons/fa6';

function SearchBox() {
  return (
    <div>
      <form>
        <label
          htmlFor="default-search"
          className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        ></label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-2">
            <div className="h-4 w-4 pb-2 text-[#6741D9]">
              <FaSearch style={{fontSize: '1.5em'}} />
            </div>
          </div>
          <input
            type="search"
            id="default-search"
            className="placeholder:text-gray-black block w-full rounded-3xl border bg-[#EDE9E6] p-4 ps-10 text-sm  text-gray-900 placeholder:text-left placeholder:text-base placeholder:font-extralight "
            placeholder="search for keywords, tags, questions..."
            required
          />
          <button
            type="submit"
            className=" absolute bottom-2.5 end-9 rounded-lg px-2 py-2 text-sm font-normal text-black hover:bg-black hover:text-white"
          >
            search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBox;
