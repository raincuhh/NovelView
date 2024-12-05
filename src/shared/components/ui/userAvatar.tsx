import React, { HTMLAttributes, useEffect, useState } from "react";

type UserAvatarProps = HTMLAttributes<HTMLDivElement> & {};

const UserAvatar = ({ ...props }: UserAvatarProps): React.JSX.Element => {
   const [loading, setLoading] = useState<boolean>(true);
   const [userAvatarUrl, setUserAvatarUrl] = useState<string>(
      "../../../../../../public/assets/placeholders/avatars/profileAvatarPlaceholder.png",
   );

   useEffect(() => {
      fetchUserAvatarUrl();
   }, []);

   const fetchUserAvatarUrl = async () => {
      setLoading(true);
      setTimeout(() => {
         setLoading(false);
      }, 1000);
   };

   // replace loading with a skeleton thing.
   return (
      <>
         <div {...props}>
            <div className="w-full h-full">
               {loading ? (
                  <div className="w-full h-full bg-interactive-base rounded-radius-full"></div>
               ) : (
                  <div className="w-full h-full bg-interactive-base rounded-radius-full">
                     <img src={userAvatarUrl} alt="pfp" className="rounded-radius-full" />
                  </div>
               )}
            </div>
         </div>
      </>
   );
};

export default UserAvatar;
