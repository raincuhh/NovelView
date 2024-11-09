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
         <header className="flex flex-col mb-10">
            <h1
               className="mb-1 text-fs-lg text-text-normal font-tertiary"
               style={{ fontWeight: 700 }}
            >
               {label}
            </h1>
            <p className="text-fs-xs text-text-muted font-secondary">
               {desc}
            </p>
         </header>
      </>
   );
}
