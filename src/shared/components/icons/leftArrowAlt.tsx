import { SvgIconProps } from "@/shared/types";

type leftArrowAltIconProps = SvgIconProps;

const leftArrowAltIcon = ({ className }: leftArrowAltIconProps) => {
   return (
      <>
         <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            viewBox="0 0 24 24"
         >
            <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z" />
         </svg>
      </>
   );
};

export default leftArrowAltIcon;
