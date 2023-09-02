import Button from "../ui/Button";

const Navbar = () => {
  return (
    <nav className="flex justify-between">
      <h1 className="text-3xl font-semibold">Task Board</h1>
      <div>
        <Button>LogOut</Button>
      </div>
    </nav>
  );
};

export default Navbar;
