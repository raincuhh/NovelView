import React, { HTMLAttributes, useEffect, useState } from "react";

type UserAvatarProps = HTMLAttributes<HTMLDivElement> & {};

const UserAvatar = ({ ...props }: UserAvatarProps): React.JSX.Element => {
   const [loading, setLoading] = useState<boolean>(true);
   const [userAvatarUrl, setUserAvatarUrl] = useState<string>(
      "/assets/placeholders/avatars/placeholder.jpg",
   );

   const fetchUserAvatarUrl = async () => {
      setLoading(true);
      setTimeout(() => {
         setLoading(false);
      }, 1000);
   };

   useEffect(() => {
      fetchUserAvatarUrl();
   }, []);

   return (
      <>
         <div {...props}>
            <div className="w-full h-full">
               <div className="w-full h-full bg-interactive-base rounded-radius-full">
                  {loading ? (
                     <div></div>
                  ) : (
                     <img src={userAvatarUrl} alt="pfp" className="rounded-radius-full" />
                  )}
               </div>
            </div>
         </div>
      </>
   );
};

export default UserAvatar;
