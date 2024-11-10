/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
   content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
   safelist: [
      //titlebar
      "bg-destructive-default",
      "bg-accent-primary",
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
            "base-black": "var(--base-black)",
            "base-00": "var(--base-00)",
            "base-05": "var(--base-05)",
            "base-10": "var(--base-10)",
            "base-20": "var(--base-20)",
            "base-25": "var(--base-25)",
            "base-30": "var(--base-30)",
            "base-35": "var(--base-35)",
            "base-40": "var(--base-40)",
            "base-50": "var(--base-50)",
            "base-60": "var(--base-60)",
            "base-70": "var(--base-70)",
            "base-80": "var(--base-80)",
            "base-90": "var(--base-90)",
            "base-100": "var(--base-100)",

            //brand colors
            "brand-default": "var(--brand-default)",
            "brand-600": "var(--brand-600)",
            "brand-500": "var(--brand-500)",
            "brand-400": "var(--brand-400)",
            "brand-300": "var(--brand-300)",
            "brand-200": "var(--brand-200)",

            //accent colors
            "accent-primary": "var(--accent-primary)",
            "accent-secondary": "var(--accent-secondary)",
            "accent-tertiary": "var(--accent-tertiary)",

            //background colors
            "background-primary":
               "var(--background-primary)",
            "background-primary-alt":
               "var(--background-primary-alt)",
            "background-secondary":
               "var(--background-secondary)",
            "background-tertiary":
               "var(--background-tertiary)",

            //border colors
            "border-primary": "var(--border-primary)",
            "border-secondary": "var(--border-secondary)",
            "border-tertiary": "var(--border-tertiary)",

            //warning colors
            "warning-default": "var(--warning-default)",
            "warning-600": "var(--warning-600)",
            "warning-500": "var(--warning-500)",
            "warning-400": "var(--warning-400)",
            "warning-300": "var(--warning-300)",
            "warning-200": "var(--warning-200)",

            //destructive colors
            "destructive-default":
               "var(--destructive-default)",
            "destructive-600": "var(--destructive-600)",
            "destructive-500": "var(--destructive-500)",
            "destructive-400": "var(--destructive-400)",
            "destructive-300": "var(--destructive-300)",
            "destructive-200": "var(--destructive-200)",

            //interactive state colors
            "interactive-normal": "var(--base-30)",
            "interactive-hover": "var(--base-35)",
            "interactive-accent": "var(--accent-primary)",
            "interactive-accent-hover":
               "var(--accent-secondary)",

            //text colors
            "text-normal": "var(--text-normal)",
            "text-muted": "var(--text-muted)",
            "text-faint": "var(--text-faint)",
            "text-on-accent": "var(--text-on-accent)",
            "text-on-accent-inverted":
               "var(--text-on-accent-inverted)",
            "text-error": "var(--text-error)",
            "text-warning": "var(--text-warning)",

            /*              custom stuff               */
            "titlebar-bg": "var(--background-secondary)",

            //input
            "input-bg": "var(--base-15)",
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
            "fs-3xs":
               "clamp(0.75rem, 2vw + 0.3rem, 0.875rem)",
            "fs-2xs":
               "clamp(0.8125rem, 2vw + 0.5rem, 1rem)",
            "fs-xs": "clamp(0.875rem, 2vw + 1rem, 1rem)",
            "fs-sm": "clamp(1rem, 2vw + 1.25rem, 1.25rem)",
            "fs-md": "clamp(1.25rem, 2vw + 1.5rem, 1.5rem)",
            "fs-lg": "clamp(1.5rem, 2vw + 1.75rem, 2rem)",
            "fs-xl": "clamp(2rem, 2vw + 2.25rem, 3rem)",
            "fs-2xl": "clamp(2.5rem, 2vw + 3rem, 4rem)",
            "fs-3xl": "clamp(3rem, 2vw + 3.5rem, 5rem)",
         },
         fontFamily: {
            primary: ["Satoshi-Variable", "sans-serif"],
            secondary: ['"Roboto"', "sans-serif"],
            tertiary: ["Nuito Sans", "sans-serif"],
         },
         height: {
            "titlebar-height": "30px",
         },
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
         screens: {
            "min-h-667": { raw: "(min-height: 667px)" },
            "min-w-500": "500px",
            "min-w-850": "850px",
            "min-w-1150": "1150px",
            "min-w-1400": "1400px",
         },
      },
   },
   plugins: [
      plugin(function ({ addBase }) {
         addBase({
            ":root": {
               //base
               "--base-black": "rgb(0, 0, 0)",
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
               "--base-80": "rgb(191, 191, 191)",
               "--base-90": "rgb(204, 204, 204)",
               "--base-100": "rgb(218, 218, 218)",

               //brand colors
               "--brand-default": "hsl(259, 51%, 55%)",
               "--brand-600": "hsl(259, 51%, 65%)",
               "--brand-500": "hsl(259, 51%, 45%)",
               "--brand-400": "hsl(259, 51%, 35%)",
               "--brand-300": "hsl(259, 51%, 75%)",
               "--brand-200": "hsl(259, 51%, 85%)",

               //accent colors
               "--accent-primary": "hsl(258, 88%, 66%)",
               "--accent-secondary": "hsl(255, 89%, 76%)",
               "--accent-tertiary": "hsl(253, 92%, 85%)",

               //background colors
               "--background-primary": "var(--base-05)",
               "--background-primary-alt": "var(--base-20)",
               "--background-secondary": "var(--base-25)",
               "--background-tertiary": "var(--base-30)",
               "--background-modifier-hover":
                  "rgba(var(--mono-rgb-100), 0.075)",
               "--background-modifier-active-hover":
                  "hsla(258, 88%, 66%, 0.15)",
               "--background-modifier-border":
                  "var(--base-25)",

               //border colors
               "--border-primary": "var(--base-25)",
               "--border-secondary": "var(--base-30)",
               "--border-tertiary": "var(--base-35)",

               //warning colors
               "--warning-default":
                  "hsl(38.9, 100%, 42.9%)",
               "--warning-600": "hsl(38.9, 100%, 42.9%)",
               "--warning-500": "hsl(34.8, 90.9%, 21.6%)",
               "--warning-400": "hsl(33.2, 100%, 14.5%)",
               "--warning-300": "hsl(32.3, 100%, 10.2%)",
               "--warning-200": "hsl(36.6, 100%, 8%)",

               //destructive colors
               "--destructive-default":
                  "hsl(10.2, 77.9%, 53.9%)",
               "--destructive-600":
                  "hsl(9.7, 85.2%, 62.9%)",
               "--destructive-500": "hsl(7.9, 71.6%, 29%)",
               "--destructive-400": "hsl(6.7, 60%, 20.6%)",
               "--destructive-300":
                  "hsl(7.5, 51.3%, 15.3%)",
               "--destructive-200":
                  "hsl(10.9, 23.4%, 9.2%)",

               //interactive state colors
               "--interactive-normal": "var(--base-30)",
               "--interactive-hover": "var(--base-35)",
               "--interactive-accent":
                  "var(--accent-primary)",
               "--interactive-accent-hover":
                  "var(--accent-secondary)",

               //text
               "--text-normal": "var(--base-90)",
               "--text-muted": "var(--base-60)",
               "--text-faint": "var(--base-50)",
               "--text-on-accent": "white",
               "--text-on-accent-inverted": "black",
               "--text-error": "var(--destructive-default)",
               "--text-warning": "var(--warning-default)",

               //fonts
               "--font-primary":
                  '"Satoshi-Variable", sans-serif',
               "--font-secondary": '"Roboto", sans-serif',
               "--font-tertiary":
                  '"Nunito Sans", sans-serif',
            },
         });
      }),
   ],
};
