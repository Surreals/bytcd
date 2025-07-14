import { Link } from 'react-router-dom'; // Import Link

const Info = () => {
  return (
    <div className="w-full flex items-start justify-between">
      <p>
        <Link to="/" className="hover:text-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md">
          (002) <span>bytcd</span>
        </Link>
      </p>
      <div className="text-left md:block hidden">
        <p>Unique & Convenient</p>
        <p>Design Solutions</p>
      </div>
      {/* The contact link will be moved to the new Navbar */}
      <p className="hover:text-blue-500 transition-colors">.com</p>
    </div>
  );
};

export default Info;