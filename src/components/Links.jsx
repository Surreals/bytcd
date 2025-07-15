import { mainLinks, sideLinks } from "../utils/constants";

const Links = () => {
  const buildLink = ({ name, url }) => {
    return (
      <a target="_blank" key={name} href={url} className="w-auto hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md">
        {name}
      </a>
    );
  };
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-end text-white md:text-xl font-light text-2xl">
      <div className="flex flex-col text-left mb-4 md:mb-0">
        {mainLinks.map((lnk) => buildLink(lnk))}
      </div>
      <div className="flex flex-col text-right mb-4 md:mb-0">
        {sideLinks.map((lnk) => buildLink(lnk))}
      </div>
      <div className="text-center md:text-right text-sm md:text-base mt-4 md:mt-0 text-gray-400">
        <p>&copy; {new Date().getFullYear()} BYTCD. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Links;