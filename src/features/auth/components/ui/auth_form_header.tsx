type AuthFormHeaderProps = {
   label: string;
   desc: string;
};

export default function AuthFormHeader({
   label,
   desc,
}: AuthFormHeaderProps): JSX.Element {
   return (
      <>
         <header className="flex flex-col mb-4">
            <h1
               className="mb-1 text-fs-lg text-text-normal font-primary"
               style={{ fontWeight: 700 }}
            >
               {label}
            </h1>
            <p
               className="text-fs-xs text-text-muted font-primary"
               style={{ fontWeight: 500 }}
            >
               {desc}
            </p>
         </header>
      </>
   );
}
