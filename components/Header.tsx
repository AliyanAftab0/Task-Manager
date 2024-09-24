import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="p-6 flex justify-center items-center bg-gradient-to-r from-blue-400 to-blue-600 rounded-b-lg shadow-lg">
      <Image src="/logo1.png" width={100} height={100} alt="logo" />
    </header>
  );
};

export default Header;
