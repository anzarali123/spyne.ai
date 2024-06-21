import Dropdown from "./Dropdown";

export const Navbar = () => {
  return (
    <div className="flex  justify-between p-3 items-center  bg-blue-500 text-white ">
      <h1>Video Caption App</h1>
      <Dropdown />
    </div>
  );
};
