/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
   content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
   safelist: [
      //titlebar
      "hover:bg-red-500",
      "hover:bg-base-40",
      "text-fs-sm",
      "text-fs-md",
      "text-fs-lg",
   ],
   theme: {
      extend: {
         colors: {
            //base colors
            "base-00": "rgb(25, 25, 25)",
            "base-05": "rgb(28, 28, 28)",
            "base-10": "rgb(31, 31, 31)",
            "base-20": "rgb(33, 33, 33)",
            "base-25": "rgb(37, 37, 37)",
            "base-30": "rgb(51, 51, 51)",
            "base-35": "rgb(61, 61, 61)",
            "base-40": "rgb(82, 82, 82)",
            "base-50": "rgb(99, 99, 99)",
            "base-60": "rgb(153, 153, 153)",
            "base-70": "rgb(179, 179, 179)",
            "base-100": "rgb(218, 218, 218)",

            //accent colors
            "accent-primary": "hsl(258, 88%, 66%)",
            "accent-secondary": "hsl(255, 89%, 76%)",
            "accent-tertiary": "hsl(253, 92%, 85%)",

            //background colors
            "background-primary": "var(--base-00)",
            "background-primary-alt": "var(--base-10)",
            "background-secondary": "var(--base-20)",
            "background-modifier-hover":
               "rgba(var(--mono-rgb-100), 0.075)",
            "background-modifier-active-hover":
               "hsla(258, 88%, 66%, 0.15)",
            "background-modifier-border": "var(--base-25)",

            //interactive states
            "interactive-normal": "var(--base-30)",
            "interactive-hover": "var(--base-35)",
            "interactive-accent": "var(--accent-primary)",
            "interactive-accent-hover":
               "var(--accent-secondary)",

            //text colors
            "text-primary": "var(--text-normal)",
            "text-muted": "var(--text-muted)",
            "text-secondary": "var(--text-faint)",
            "text-on-accent": "var(--text-on-accent)",
            "text-on-accent-inverted":
               "var(--text-on-accent-inverted)",
            "text-error": "var(--text-error)",
            "text-warning": "var(--text-warning)",

            //custom stuff
            "titlebar-bg": "var(--background-secondary)",
         },
         boxShadow: {
            "input-shadow":
               "inset 0 0.5px 0.5px 0.5px rgba(255, 255, 255, 0.09), 0 2px 4px 0 rgba(0, 0, 0, .15), 0 1px 1.5px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .2), 0 0 0 0 transparent",
            "input-shadow-hover":
               "inset 0 0.5px 1px 0.5px rgba(255, 255, 255, 0.16), 0 2px 3px 0 rgba(0, 0, 0, .3), 0 1px 1.5px 0 rgba(0, 0, 0, .2), 0 1px 2px 0 rgba(0, 0, 0, .4), 0 0 0 0 transparent",
            "shadow-s":
               "0px 1px 2px rgba(0, 0, 0, 0.121), 0px 3.4px 6.7px rgba(0, 0, 0, 0.179), 0px 15px 30px rgba(0, 0, 0, 0.3)",
            "shadow-l":
               "0px 1.8px 7.3px rgba(0, 0, 0, 0.071), 0px 6.3px 24.7px rgba(0, 0, 0, 0.112), 0px 30px 90px rgba(0, 0, 0, 0.2)",
         },
         spacing: {
            "spc-xs": "calc(1em / 1.618)",
            "spc-sm": "calc(1em / 1.618)",
            "spc-md": "1em",
            "spc-lg": "calc(1em * 1.618)",
            "spc-xl": "calc((1em * 1.618) * 1.618)",
            "spc-xxl":
               "calc(((1em * 1.618) * 1.618) * 1.618)",
            "spc-max-width": "clamp(76rem, 53vw, 84rem)",
         },

         fontSize: {
            "fs-xs": "clamp(0.875rem, 2vw + 1rem, 1rem)",
            "fs-sm": "clamp(1rem, 2vw + 1.25rem, 1.25rem)",
            "fs-md": "clamp(1.25rem, 2vw + 1.5rem, 1.5rem)",
            "fs-lg": "clamp(1.5rem, 2vw + 1.75rem, 2rem)",
            "fs-xl": "clamp(2rem, 2vw + 2.25rem, 3rem)",
            "fs-2xl": "clamp(2.5rem, 2vw + 3rem, 4rem)",
            "fs-3xl": "clamp(3rem, 2vw + 3.5rem, 5rem)",
         },
         height: {
            "titlebar-height": "30px",
         },
         fontFamily: {},
         zIndex: {
            "layer-background": 5,
            "layer-sidebar": 10,
            "layer-header": 15,
            "layer-popup": 30,
            "layer-content": 45,
            "layer-modal": 50,
            "layer-notification": 60,
            "layer-menu": 65,
            "layer-tooltip": 70,
            "layer-dragging": 80,
            "layer-native": 90,
            "layer-window": 100,
         },
         transitionProperty: {
            "transition-all": "all",
            "transition-color": "color",
            "transition-bg": "background-color",
            "transition-height": "height",
            "transition-transform": "transform",
            "transition-opacity": "opacity",
         },
         transitionTimingFunction: {
            "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
            "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
            "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
            linear: "linear",
            ease: "ease",
         },
      },
   },
   plugins: [
      plugin(function ({ addBase }) {
         addBase({
            ":root": {
               //base
               "--base-00": "rgb(25, 25, 25)",
               "--base-05": "rgb(28, 28, 28)",
               "--base-10": "rgb(31, 31, 31)",
               "--base-20": "rgb(33, 33, 33)",
               "--base-25": "rgb(37, 37, 37)",
               "--base-30": "rgb(51, 51, 51)",
               "--base-35": "rgb(61, 61, 61)",
               "--base-40": "rgb(82, 82, 82)",
               "--base-50": "rgb(99, 99, 99)",
               "--base-60": "rgb(153, 153, 153)",
               "--base-70": "rgb(179, 179, 179)",
               "--base-100": "rgb(218, 218, 218)",

               //accent
               "--accent-primary": "hsl(258, 88%, 66%)",
               "--accent-secondary": "hsl(255, 89%, 76%)",
               "--accent-tertiary": "hsl(253, 92%, 85%)",

               //bgs
               "--background-primary": "var(--base-00)",
               "--background-primary-alt": "var(--base-10)",
               "--background-secondary": "var(--base-20)",
               "--background-modifier-hover":
                  "rgba(var(--mono-rgb-100), 0.075)",
               "--background-modifier-active-hover":
                  "hsla(258, 88%, 66%, 0.15)",
               "--background-modifier-border":
                  "var(--base-25)",

               "--interactive-normal": "var(--base-30)",
               "--interactive-hover": "var(--base-35)",
               "--interactive-accent":
                  "var(--accent-primary)",
               "--interactive-accent-hover":
                  "var(--accent-secondary)",

               //primarys
               "--color-red": "rgb(255, 0, 0)",
               "--color-orange": "rgb(255, 165, 0)",

               //text
               "--text-normal": "var(--base-100)",
               "--text-muted": "var(--base-70)",
               "--text-faint": "var(--base-50)",
               "--text-on-accent": "white",
               "--text-on-accent-inverted": "black",
               "--text-error": "var(--color-red)",
               "--text-warning": "var(--color-orange)",
            },
         });
      }),
   ],
};
