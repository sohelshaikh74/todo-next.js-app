const Navbar = () => {
  return (
    <div className="flex py-3 justify-between items-center bg-gray-800 text-white px-20">
      <h1 className="text-lg font-semibold">Todo App</h1>
      <ul className="flex gap-8">
        <li className="hover:text-gray-400 cursor-pointer">Home</li>
        <li className="hover:text-gray-400 cursor-pointer">Products</li>
        <li className="hover:text-gray-400 cursor-pointer">About</li>
        <li className="hover:text-gray-400 cursor-pointer">Contact</li>
      </ul>
    </div>
  );
};

export default Navbar;
