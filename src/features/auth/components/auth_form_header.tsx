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
         <div className="flex flex-col mb-6">
            <h1 className="mb-1 text-fs-md text-text-primary">
               {label}
            </h1>
            <p className="text-fs-xs text-text-muted">
               {desc}
            </p>
         </div>
      </>
   );
}
