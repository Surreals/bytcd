import { Link } from 'react-router-dom'; // Import Link
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const Info = () => {
  const { t } = useTranslation(); // Initialize useTranslation

  return (
    <div className="w-full flex items-start justify-between">
      <p>
        <Link to="/" className="hover:text-blue-500 transition-colors">
          (002) <span>bytcd</span>
        </Link>
      </p>
      <div className="text-left md:block hidden">
        <p>{t('info_section.slogan_line1')}</p>
        <p>{t('info_section.slogan_line2')}</p>
      </div>
      {/* The contact link will be moved to the new Navbar */}
      <p className="hover:text-blue-500 transition-colors">.com</p>
    </div>
  );
};

export default Info;