import { mainLinks, sideLinks } from "../utils/constants";
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const Links = () => {
  const { t } = useTranslation(); // Initialize useTranslation

  const buildLink = ({ name, url }) => {
    // Use translation for the 'soon' link name
    const displayName = name === 'soon' ? t('links_section.soon') : name;
    return (
      <a target="_blank" key={name} href={url} className="w-auto hover:text-blue-500 transition-colors">
        {displayName}
      </a>
    );
  };
  return (
    <div className="flex md:text-xl font-light text-2xl justify-between">
      <div className="flex flex-col text-left">{mainLinks.map((lnk) => buildLink(lnk))}</div>
      <div className="flex flex-col text-right">{sideLinks.map((lnk) => buildLink(lnk))}</div>
    </div>
  );
};

export default Links;