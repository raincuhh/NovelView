import { SvgIconProps } from "@/shared/types";

type PlusIconProps = SvgIconProps;

const PlusIcon = ({ className }: PlusIconProps) => {
   return (
      <>
         <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            viewBox="0 0 24 24"
         >
            <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
         </svg>
      </>
   );
};

export default PlusIcon;
