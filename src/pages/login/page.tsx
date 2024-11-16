import React, { useEffect, useState } from "react";
import { tauriGetCurrentWebViewWindow } from "../../shared/lib/tauri";
import LoginPageContent from "../../widgets/login/loginPageContent";

export default function LoginPage(): React.JSX.Element {
   return (
      <>
         <LoginPageContent />
      </>
   );
}
