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
            className={`${css} dark:border-c-border-secondary bg-c-base-20 placeholder:text-c-text-faint text-text-primary font-c-primary dark:focus:outline-base-25 w-full rounded-[4px] border-[1px] border-solid px-4 py-2 focus:outline-none focus:outline-offset-[0px]`}
            style={{ fontWeight: 500 }}
         />
      </>
   );
}
