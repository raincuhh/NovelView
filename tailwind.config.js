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
      "text-c-sm",
      "text-c-md",
      "text-c-lg",
   ],
   theme: {
      extend: {
         colors: {
            // Base colors
            "c-base-black": "var(--base-black)",
            "c-base-00": "var(--base-00)",
            "c-base-05": "var(--base-05)",
            "c-base-10": "var(--base-10)",
            "c-base-20": "var(--base-20)",
            "c-base-25": "var(--base-25)",
            "c-base-30": "var(--base-30)",
            "c-base-35": "var(--base-35)",
            "c-base-40": "var(--base-40)",
            "c-base-50": "var(--base-50)",
            "c-base-60": "var(--base-60)",
            "c-base-70": "var(--base-70)",
            "c-base-80": "var(--base-80)",
            "c-base-90": "var(--base-90)",
            "c-base-100": "var(--base-100)",

            // Brand colors
            "c-brand-button-bg": "var(--brand-button-bg)",
            "c-brand-button-bg-hover": "var(--brand-button-bg-hover)",
            "c-brand-default": "var(--brand-default)",
            "c-brand-600": "var(--brand-600)",
            "c-brand-500": "var(--brand-500)",
            "c-brand-400": "var(--brand-400)",
            "c-brand-300": "var(--brand-300)",
            "c-brand-200": "var(--brand-200)",

            // Accent colors
            "c-accent-primary": "var(--accent-primary)",
            "c-accent-secondary": "var(--accent-secondary)",
            "c-accent-tertiary": "var(--accent-tertiary)",

            // Background colors
            "c-background-primary": "var(--background-primary)",
            "c-background-primary-alt": "var(--background-primary-alt)",
            "c-background-secondary": "var(--background-secondary)",
            "c-background-tertiary": "var(--background-tertiary)",

            // Border colors
            "c-border-primary": "var(--border-primary)",
            "c-border-secondary": "var(--border-secondary)",
            "c-border-tertiary": "var(--border-tertiary)",

            // Warning colors
            "c-warning-default": "var(--warning-default)",
            "c-warning-600": "var(--warning-600)",
            "c-warning-500": "var(--warning-500)",
            "c-warning-400": "var(--warning-400)",
            "c-warning-300": "var(--warning-300)",
            "c-warning-200": "var(--warning-200)",

            // Destructive colors
            "c-destructive-default": "var(--destructive-default)",
            "c-destructive-600": "var(--destructive-600)",
            "c-destructive-500": "var(--destructive-500)",
            "c-destructive-400": "var(--destructive-400)",
            "c-destructive-300": "var(--destructive-300)",
            "c-destructive-200": "var(--destructive-200)",

            // Interactive state colors
            "c-interactive-normal": "var(--base-30)",
            "c-interactive-hover": "var(--base-35)",
            "c-interactive-accent": "var(--accent-primary)",
            "c-interactive-accent-hover": "var(--accent-secondary)",

            // Text colors
            "c-text-normal": "var(--text-normal)",
            "c-text-muted": "var(--text-muted)",
            "c-text-faint": "var(--text-faint)",
            "c-text-on-accent": "var(--text-on-accent)",
            "c-text-on-accent-inverted": "var(--text-on-accent-inverted)",
            "c-text-error": "var(--text-error)",
            "c-text-warning": "var(--text-warning)",

            // Custom
            "c-titlebar-bg": "var(--background-secondary)",

            // Input
            "c-input-bg": "var(--base-15)",
         },
         boxShadow: {
            "c-input-shadow":
               "inset 0 0.5px 0.5px 0.5px rgba(255, 255, 255, 0.09), 0 2px 4px 0 rgba(0, 0, 0, .15), 0 1px 1.5px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .2), 0 0 0 0 transparent",
            "c-input-shadow-hover":
               "inset 0 0.5px 1px 0.5px rgba(255, 255, 255, 0.16), 0 2px 3px 0 rgba(0, 0, 0, .3), 0 1px 1.5px 0 rgba(0, 0, 0, .2), 0 1px 2px 0 rgba(0, 0, 0, .4), 0 0 0 0 transparent",
            "c-shadow-s":
               "0px 1px 2px rgba(0, 0, 0, 0.121), 0px 3.4px 6.7px rgba(0, 0, 0, 0.179), 0px 15px 30px rgba(0, 0, 0, 0.3)",
            "c-shadow-l":
               "0px 1.8px 7.3px rgba(0, 0, 0, 0.071), 0px 6.3px 24.7px rgba(0, 0, 0, 0.112), 0px 30px 90px rgba(0, 0, 0, 0.2)",
         },

         fontSize: {
            "c-default": "var(--c-default)",
            "c-xs": "var(--c-xs)",
            "c-sm": "var(--c-sm)",
            "c-md": "var(--c-md)",
            "c-lg": "var(--c-lg)",
            "c-xl": "var(--c-xl)",
            "c-2xl": "var(--c-2xl)",
            "c-3xl": "var(--c-3xl)",
         },
         fontFamily: {
            "c-primary": ["Satoshi-Variable", "sans-serif"],
            "c-secondary": ['"Roboto"', "sans-serif"],
            "c-tertiary": ["Nuito Sans", "sans-serif"],
         },
         fontWeight: {
            "c-weight-xl": "700",
            "c-weight-lg": "600",
            "c-weight-md": "500",
         },
         height: {
            "c-titlebar-height": "30px",
         },
         zIndex: {
            "c-layer-background": 5,
            "c-layer-sidebar": 10,
            "c-layer-header": 15,
            "c-layer-popup": 30,
            "c-layer-content": 45,
            "c-layer-modal": 50,
            "c-layer-notification": 60,
            "c-layer-menu": 65,
            "c-layer-tooltip": 70,
            "c-layer-dragging": 80,
            "c-layer-native": 90,
            "c-layer-window": 100,
         },
         screens: {
            "c-min-h-650": { raw: "(min-height: 650px)" },
            "c-min-h-668": { raw: "(min-height: 668px)" },
            "c-min-w-500": "500px",
            "c-min-w-850": "850px",
            "c-min-w-1150": "1150px",
            "c-min-w-1400": "1400px",
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
               "--brand-button-bg": "var(--brand-500)",
               "--brand-button-bg-hover": "var(--brand-600)",
               "--brand-default": "hsl(259, 51%, 65%)",
               "--brand-600": "hsl(259, 51%, 55%)",
               "--brand-500": "hsl(259, 51%, 45%)",
               "--brand-400": "hsl(259, 51%, 35%)",
               "--brand-300": "hsl(259, 51%, 75%)",
               "--brand-200": "hsl(259, 51%, 85%)",

               //accent colors
               "--accent-primary": "var(--brand-default)",
               "--accent-secondary": "var(--brand-600)",
               "--accent-tertiary": "var(--brand-500)",

               //background colors
               "--background-primary": "var(--base-05)",
               "--background-primary-alt": "var(--base-20)",
               "--background-secondary": "var(--base-25)",
               "--background-tertiary": "var(--base-30)",
               "--background-modifier-hover": "rgba(var(--mono-rgb-100), 0.075)",
               "--background-modifier-active-hover": "hsla(258, 88%, 66%, 0.15)",
               "--background-modifier-border": "var(--base-25)",

               //border colors
               "--border-primary": "var(--base-25)",
               "--border-secondary": "var(--base-30)",
               "--border-tertiary": "var(--base-35)",

               //warning colors
               "--warning-default": "hsl(38.9, 100%, 42.9%)",
               "--warning-600": "hsl(38.9, 100%, 42.9%)",
               "--warning-500": "hsl(34.8, 90.9%, 21.6%)",
               "--warning-400": "hsl(33.2, 100%, 14.5%)",
               "--warning-300": "hsl(32.3, 100%, 10.2%)",
               "--warning-200": "hsl(36.6, 100%, 8%)",

               //destructive colors
               "--destructive-default": "hsl(10.2, 77.9%, 53.9%)",
               "--destructive-600": "hsl(9.7, 85.2%, 62.9%)",
               "--destructive-500": "hsl(7.9, 71.6%, 29%)",
               "--destructive-400": "hsl(6.7, 60%, 20.6%)",
               "--destructive-300": "hsl(7.5, 51.3%, 15.3%)",
               "--destructive-200": "hsl(10.9, 23.4%, 9.2%)",

               //interactive state colors
               "--interactive-normal": "var(--base-30)",
               "--interactive-hover": "var(--base-35)",
               "--interactive-accent": "var(--accent-primary)",
               "--interactive-accent-hover": "var(--accent-secondary)",

               //text
               "--text-normal": "var(--base-90)",
               "--text-muted": "var(--base-60)",
               "--text-faint": "var(--base-50)",
               "--text-on-accent": "white",
               "--text-on-accent-inverted": "black",
               "--text-error": "var(--destructive-default)",
               "--text-warning": "var(--warning-default)",

               //fonts
               "--font-primary": '"Satoshi-Variable", sans-serif',
               "--font-secondary": '"Roboto", sans-serif',
               "--font-tertiary": '"Nunito Sans", sans-serif',

               //fontsize
               "--c-default": "1rem",
               "--c-xs": "0.75rem",
               "--c-sm": "0.875rem",
               "--c-md": "1rem",
               "--c-lg": "1.25rem",
               "--c-xl": "1.5rem",
               "--c-2xl": "2rem",
               "--c-3xl": "3rem",
            },
         });
      }),
   ],
};
