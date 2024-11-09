import { Link } from "react-router-dom";

type AuthFormSwitcherProps = {
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
               <span className="underline md:hover:text-text-normal transition-colors duration-100">
                  {link_label}
               </span>
            </Link>
         </div>
      </>
   );
}
