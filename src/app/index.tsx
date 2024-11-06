import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import App from "./app";

const root: ReactDOM.Root = createRoot(
   document.getElementById("root") as HTMLElement
);

function render(strict: boolean = true) {
   if (strict) {
      root.render(
         <React.StrictMode>
            <App />
         </React.StrictMode>
      );
   } else {
      root.render(<App />);
   }
}

render(false);
