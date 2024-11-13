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
         <div
            className="my-8 text-center text-text-muted font-primary"
            style={{ fontWeight: 500 }}
         >
            {desc}{" "}
            <Link to={link_path}>
               <span className="underline text-text-normal hover:text-brand-button-bg-hover transition-colors duration-100 ease-in-out">
                  {link_label}
               </span>
            </Link>
         </div>
      </>
   );
}
