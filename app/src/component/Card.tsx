import SubTitle from "./SubTitle";
import { Link } from "react-router-dom";

interface Props {
  link: string;
  title: string;
  description: string;
  className?: string;
}

function Card({ link, title, description, className = "" }: Props) {
  return (
    <Link to={link} className={`card-terra block no-underline text-inherit ${className}`}>
      <SubTitle text={title} />
      <p className="text-vault-text line-clamp-2"> {description}</p>
    </Link>
  );
}

export default Card;
