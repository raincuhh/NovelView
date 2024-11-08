type AuthDividerProps = { label: string };

export default function AuthDivider({
   label,
}: AuthDividerProps) {
   return (
      <div className="relative my-4">
         <hr className="h-[1px] w-full bg-base-30" />
         <div className="font-secondary text-text-normal absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] bg-base-00 px-2">
            {label}
         </div>
      </div>
   );
}
