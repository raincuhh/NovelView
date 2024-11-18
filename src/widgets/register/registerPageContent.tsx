import React from "react";
import AuthNavStateProvider from "../../features/auth/providers/authNavStateProvider";

import CenteredLayout from "../../shared/components/layout/centeredLayout";

export default function RegisterPageContent(): React.JSX.Element {
   return (
      <>
         <AuthNavStateProvider>
            <CenteredLayout>test</CenteredLayout>
         </AuthNavStateProvider>
      </>
   );
}
