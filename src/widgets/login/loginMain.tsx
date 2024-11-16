import React, { useEffect } from "react";
import { useNavState } from "../../features/auth/hooks/navStateHook";
import { uppercaseify } from "../../shared/lib/utils";

export default function LoginMain(): React.JSX.Element {
   const { setTitle, setBackLocation } = useNavState();

   useEffect(() => {
      setTitle(uppercaseify("login"));
   }, [setTitle, setBackLocation]);

   return (
      <>
         <main className="py-6 px-2 mx-auto w-[50rem] max-w-[90%] h-full">
            <div className="flex flex-col select-none h-full relative justify-start c-min-h-668:justify-center">
               test
            </div>
         </main>
      </>
   );
}
