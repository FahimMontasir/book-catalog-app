import logo from '@/assets/images/book-catalog-logo.png';
import { RiFacebookBoxFill, RiInstagramLine } from 'react-icons/ri';

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="bg-[#242630] text-secondary p-20">
      <div className="flex justify-between">
        <div>
          <img className="h-[150px]" src={logo} alt="Logo" />
        </div>
        <div className="flex gap-20">
          <ul className="space-y-2">
            <li>Privacy Policy</li>
            <li>Terms & Condition</li>
          </ul>
          <ul className="space-y-2">
            <li>Support</li>
            <li>Careers</li>
          </ul>
          <ul className="space-y-2">
            <li>List your gear</li>
            <li>Contact team</li>
          </ul>
          <ul>
            <li className="ml-auto"> &#169; Book Catalog {year}</li>
          </ul>
        </div>
        <RiFacebookBoxFill />
        <RiInstagramLine />
      </div>
    </div>
  );
}
