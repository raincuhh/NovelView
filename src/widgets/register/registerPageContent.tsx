import React from "react";
import AuthNavStateProvider from "../../features/auth/providers/authNavStateProvider";
import CenteredLayout from "../../shared/components/layout/centeredLayout";
import AuthContent from "../../features/auth/components/ui/authContent";

export default function RegisterPageContent(): React.JSX.Element {
   return (
      <>
         <AuthNavStateProvider>
            <CenteredLayout>
               <AuthContent type="register" />
            </CenteredLayout>
         </AuthNavStateProvider>
      </>
   );
}
