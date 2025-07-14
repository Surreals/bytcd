import { Link } from 'react-router-dom'; // Import Link

const Info = () => {
  return (
    <div className="w-full flex items-start justify-between">
      <p>
        <Link to="/" className="hover:text-blue-500 transition-colors">
          (002) <span>bytcd</span>
        </Link>
      </p>
      <div className="text-left md:block hidden">
        <p>Unique & Convenient</p>
        <p>Design Solutions</p>
      </div>
      <div className="text-center md:text-left">
        <Link to="/contact-us" className="hover:text-blue-500 transition-colors">
          <p>CONTACT US</p>
        </Link>
      </div>
      <p className="hover:text-blue-500 transition-colors">.com</p>
    </div>
  );
};

export default Info;