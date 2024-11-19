import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import App from "./app";

const root: ReactDOM.Root = createRoot(
   document.getElementById("novelview") as HTMLElement,
);

const html: HTMLElement | null = document.querySelector("html");

if (html) html.setAttribute("class", "dark");

function render(strict: boolean = true) {
   if (strict) {
      root.render(
         <React.StrictMode>
            <App />
         </React.StrictMode>,
      );
   } else {
      root.render(<App />);
   }
}

render(true);
