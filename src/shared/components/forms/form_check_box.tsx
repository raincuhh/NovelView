type FormCheckBoxProps = {
   name?: string;
   id?: string;
};

export default function FormCheckBox({
   name,
   id,
}: FormCheckBoxProps) {
   return (
      <>
         <input
            type="checkbox"
            name={name}
            id={id}
            className={
               "cursor-pointer appearance-none shrink-0 w-4 h-4 border-[1px] border-solid border-border-secondary hover:border-border-tertiary rounded-[4px] bg-background-secondary hover:bg-background-primary-alt checked:hover:bg-brand-500 checked:bg-brand-400 checked:hover:border-brand-600 checked:border-brand-500"
            }
         />
      </>
   );
}
