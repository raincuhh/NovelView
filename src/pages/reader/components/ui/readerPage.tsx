import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ReaderPage = (): React.JSX.Element => {
   const { bookId } = useParams();

   useEffect(() => {
      console.log("boook id: ", bookId);
   }, [bookId]);

   return (
      <>
         <div>book: {bookId || "loading..."}</div>
      </>
   );
};

export default ReaderPage;
