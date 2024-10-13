"use client"
import React, { useState } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

// Define the type for menu items
interface MenuItem {
  title: string;
  link: string;
  dropdownItems?: string[]; // Optional dropdownItems property
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null); // Updated state type
  const [mobileDropdown, setMobileDropdown] = useState<number | null>(null); // Separate state for mobile dropdown

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const toggleMobileDropdown = (index: number) => {
    setMobileDropdown(mobileDropdown === index ? null : index);
  };

  // Define menu items with the MenuItem type
  const menuItems: MenuItem[] = [
    { title: "Home", link: "#" },
    {
      title: "Products",
      link: "#",
      dropdownItems: ["Electronics", "Clothing", "Books"]
    },
    {
      title: "Services",
      link: "#",
      dropdownItems: ["Consulting", "Design", "Development"]
    },
    { title: "About", link: "#" },
    { title: "Contact", link: "#" }
  ];

  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Logo</div>
        <nav className="hidden md:flex space-x-4">
          {menuItems.map((item, index) => (
            <div key={index} className="relative group">
              <button
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-600 focus:ring-white"
                onClick={() => toggleDropdown(index)}
                aria-haspopup={item.dropdownItems ? "true" : "false"}
                aria-expanded={activeDropdown === index ? "true" : "false"}
              >
                {item.title}
                {item.dropdownItems && (
                  <FaChevronDown className="inline-block ml-1" />
                )}
              </button>
              {item.dropdownItems && (
                <div
                  className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
                    activeDropdown === index ? "block" : "hidden"
                  } transition-all duration-300 ease-in-out`}
                >
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {item.dropdownItems.map(
                      (dropdownItem: string, dropdownIndex: number) => (
                        <a
                          key={dropdownIndex}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          {dropdownItem}
                        </a>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
        <button
          className="md:hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-600 focus:ring-white"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <FaTimes className="h-6 w-6" />
          ) : (
            <FaBars className="h-6 w-6" />
          )}
        </button>
      </div>
      {/* Mobile menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden transition-all duration-300 ease-in-out`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {menuItems.map((item, index) => (
            <div key={index}>
              <button
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-700 transition duration-300"
                onClick={() => toggleMobileDropdown(index)}
                aria-haspopup={item.dropdownItems ? "true" : "false"}
                aria-expanded={mobileDropdown === index ? "true" : "false"}
              >
                {item.title}
                {item.dropdownItems && (
                  <FaChevronDown className="float-right mt-1" />
                )}
              </button>
              {item.dropdownItems && (
                <div
                  className={`${
                    mobileDropdown === index ? "block" : "hidden"
                  } pl-4 transition-all duration-300 ease-in-out`}
                >
                  {item.dropdownItems.map(
                    (dropdownItem: string, dropdownIndex: number) => (
                      <a
                        key={dropdownIndex}
                        href="#"
                        className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-700 transition duration-300"
                      >
                        {dropdownItem}
                      </a>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
