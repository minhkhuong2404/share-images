import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if (user) {
    return (
      <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 ">
        <div className="flex justify-start items-center w-full px-2 rounded-2xl bg-gray-200 border-none outline-none focus-within:shadow-sm hover:shadow-xl hover:shadow-gray-700 hover:transition-all hover:duration-500 hover:ease-in-out">
          <IoMdSearch fontSize={21} className="ml-1" />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            value={searchTerm}
            onFocus={() => navigate('/search')}
            className="p-2 w-full bg-gray-200 outline-none"
          />
        </div>
        <div className="flex gap-3 ">
          <Link to={`user-profile/${user?._id}`} className="hidden md:block">
            <img
              src={user.image}
              alt="user-pic"
              className="w-14 h-12 rounded-lg hover:shadow-xl hover:shadow-gray-700 hover:transition-all hover:duration-500 hover:ease-in-out"
            />
          </Link>
          <Link
            to="/create-pin"
            className="bg-indigo-500 text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center hover:shadow-xl hover:shadow-gray-700 hover:transition-all hover:duration-500 hover:ease-in-out"
          >
            <IoMdAdd />
          </Link>
        </div>
      </div>
    );
  }

  return null;
};

export default Navbar;
