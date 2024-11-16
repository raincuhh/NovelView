type FormInputProps = {
   type: string;
   name?: string;
   id?: string;
   placeholder?: string;
   aria_placeholder?: string;
   auto_complete?: string;
   on_change_callback?: Function;
   css?: string;
};

export default function FormInput({
   type,
   name,
   id,
   placeholder = "placeholder",
   aria_placeholder,
   auto_complete,
   on_change_callback,
   css,
}: FormInputProps): JSX.Element {
   return (
      <>
         <input
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            aria-placeholder={aria_placeholder}
            autoComplete={auto_complete}
            aria-autocomplete="none"
            onChange={(e) => on_change_callback?.(e)}
            className={`${css} w-full border-solid border-[1px] dark:border-c-border-secondary px-4 py-2 bg-c-base-20 rounded-[4px] placeholder:text-c-text-faint text-text-primary font-c-primary focus:outline-none focus:outline-offset-[0px] dark:focus:outline-base-25`}
            style={{ fontWeight: 500 }}
         />
      </>
   );
}
