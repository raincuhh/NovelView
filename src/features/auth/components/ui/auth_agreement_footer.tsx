import { Link } from "react-router-dom";

export default function AuthAgreementFooter() {
   return (
      <div
         className="pb-16 text-center text-text-faint font-primary text-[12px] mt-auto"
         style={{ fontWeight: 500 }}
      >
         By continuing, you acknowledge that you have read
         and agree to NovelView's{" "}
         <Link to="#">
            <span className="md:hover:text-text-muted underline transition-colors duration-100 ease-in-out">
               Terms of Service
            </span>
         </Link>{" "}
         and{" "}
         <Link to="#">
            <span className="md:hover:text-text-muted underline transition-colors duration-100 ease-in-out">
               Privacy Policy
            </span>
         </Link>
         .
      </div>
   );
}
