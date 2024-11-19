import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage(): JSX.Element {
   return (
      <>
         <div>NotFoundPage</div>
         <Link to={"/"}>Go home</Link>
      </>
   );
}
