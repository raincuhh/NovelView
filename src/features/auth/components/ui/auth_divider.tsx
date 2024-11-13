type AuthDividerProps = { label?: string };

export default function AuthDivider({
   label,
}: AuthDividerProps) {
   return (
      <div className="relative my-4">
         <hr className="h-[1px] w-full bg-border-secondary" />
         <div
            className="font-primary text-text-normal absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] bg-background-primary px-2"
            style={{ fontWeight: 500 }}
         >
            {label}
         </div>
      </div>
   );
}
