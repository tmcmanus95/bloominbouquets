import { useState } from "react";
import { Link } from "react-router-dom";
export default function UserSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form className="w-96 lg:w-96">
      <label
        for="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-64 md:w-96 h-4 lg:w-96 p-4 ps-10 text-sm text-gray-900 border dark:bg-slate-500 dark:text-white border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          required
          placeholder="Search for a user"
          onChange={handleInputChange}
        />
        <Link to={`usersearch/${searchTerm}`}>
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 hidden bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
          >
            Search
          </button>
        </Link>
      </div>
    </form>
  );
}
