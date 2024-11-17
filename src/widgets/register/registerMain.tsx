import React, { useEffect } from "react";
import { uppercaseify } from "../../shared/lib/utils";
import { useNavState } from "../../features/auth/hooks/navStateHook";
import AuthMainLayout from "../../features/auth/components/layouts/authMainLayout";

export default function RegisterMain(): React.JSX.Element {
   const { setTitle, setBackLocation } = useNavState();

   useEffect(() => {
      setTitle(uppercaseify("register for free"));
   }, [setTitle, setBackLocation]);

   return (
      <>
         <AuthMainLayout>ahdhawd</AuthMainLayout>
      </>
   );
}
