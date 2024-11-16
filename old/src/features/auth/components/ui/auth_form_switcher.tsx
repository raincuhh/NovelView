import { Link } from "react-router-dom";

export type AuthFormSwitcherProps = {
   desc: string;
   link_path: string;
   link_label: string;
};

export default function AuthFormSwitcher({
   desc,
   link_path,
   link_label,
}: AuthFormSwitcherProps): JSX.Element {
   return (
      <>
         <div className="my-6 text-center dark:text-c-text-muted font-c-primary font-c-weight-md">
            {desc}{" "}
            <Link to={link_path}>
               <span className="underline text-c-text-normal dark:hover:text-c-brand-default transition-colors duration-100 ease-in-out">
                  {link_label}
               </span>
            </Link>
         </div>
      </>
   );
}
