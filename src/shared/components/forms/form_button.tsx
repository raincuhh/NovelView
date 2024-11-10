type FormButtonProps = {
   text: string;
   on_change_callback?: Function;
};

export default function FormButton({
   text,
   on_change_callback,
}: FormButtonProps) {
   return (
      <>
         <button
            onChange={(e) => on_change_callback?.(e)}
            className="w-full py-2 flex justify-center items-center bg-brand-400 hover:bg-brand-500 border-solid border-[1px] border-brand-500 hover:border-brand-600 text-text-normal rounded-[4px] font-primary transition-colors duration-100 ease-in-out"
            style={{ fontWeight: 500 }}
         >
            {text}
         </button>
      </>
   );
}
