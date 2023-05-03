import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import { client } from '../client';
import logo from '../assets/logo.png';
import { categories, getAllPinsQuery } from '../utils/data';

const isNotActiveStyle = 'flex items-center px-5 py-3 gap-3 text-gray-500 hover:text-white transition-all duration-500 ease-in-out capitalize';
const isActiveStyle = 'bg-gradient-to-tr from-rose-500 to-violet-700 bg-indigo-500 flex items-center px-5 py-3 gap-3 font-extrabold '
+ 'transition-all duration-500 ease-in-out capitalize bg-rounded-2xl text-white rounded-r-lg hover:shadow-xl hover:shadow-gray-700 hover:transition-all hover:duration-500 hover:ease-in-out';

const Sidebar = ({ closeToggle, user }) => {
  const [categoryCount, setCategoryCount] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  useEffect(() => {
    const allPins = getAllPinsQuery();
    setLoading(true);
    client.fetch(allPins).then((data) => {
      setCategoryCount(() => {
        const counts = {};
        data.forEach((pin) => {
          counts[pin.category] = (counts[pin.category] || 0) + 1;
        });
        setLoading(false);
        return [counts];
      });
    });
  }, []);

  return (
    <div className="flex flex-col justify-between bg-gray-900 h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-2">

          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="text-white mt-2 px-5 text-base 2xl:text-xl">Discover cateogries</h3>
          {categories.sort((a, b) => a.name.localeCompare(b.name))
            .slice(0, categories.length - 1).map((category) => (
              <NavLink
                to={`/category/${category.code}`}
                className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
                onClick={handleCloseSidebar}
                key={category.name}
              >
                <img src={category.image} className="w-8 h-8 rounded-full shadow-sm" />
                {category.name} { !loading && `(${categoryCount[0][category.name] || 0})` }
              </NavLink>
            ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-gray-700 rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img src={user.image} className="w-10 h-10 rounded-full" alt="user-profile" />
          <p className="text-white">{user.userName}</p>
          <IoIosArrowForward className="text-white" />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
