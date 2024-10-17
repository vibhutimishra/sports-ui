import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { fetchLogoutRequest } from '../../store/actions/sportsActions';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  const handleNavItemClick = (text) => {
    if (text === 'Home') {
      navigate(`/${userId}/events`);
    } else if (text === 'Logout') {
      dispatch(fetchLogoutRequest());
      navigate('/');
    }
  };

  const navItems = [
    { id: 1, text: 'Home' },
    { id: 2, text: 'Logout' },
  ];

  return (
    <div className='bg-black flex justify-between items-center h-24 w-full z-50 pl-4 pr-4 px-4 text-white fixed top-0 left-0 '>
      <h1 className='w-full text-3xl font-bold text-[#00df9a]'>Sports Day</h1>
      <ul className='hidden md:flex'>
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
            onClick={() => handleNavItemClick(item.text)}
          >
            {item.text}
          </li>
        ))}
      </ul>

      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
    </div>
  );
};

export default Navbar;