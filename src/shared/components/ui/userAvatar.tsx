import React, { HTMLAttributes, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

type UserAvatarProps = HTMLAttributes<HTMLDivElement> & {};

const UserAvatar = ({ ...props }: UserAvatarProps): React.JSX.Element => {
   const [loading, setLoading] = useState<boolean>(true);
   const [avatarUrl, setAvatarUrl] = useState<string>(
      "/assets/placeholders/avatars/placeholder.jpg",
   );

   const fetchavatarUrl = async () => {
      setLoading(true);
      setTimeout(() => {
         setLoading(false);
      }, 1000);
   };

   useEffect(() => {
      fetchavatarUrl();
   }, []);

   return (
      <>
         <div {...props}>
            <div className="flex items-center justify-center">
               {loading ? (
                  <Skeleton height={"100%"} width={"100%"} />
               ) : (
                  <img
                     src={avatarUrl}
                     alt="pfp"
                     className="rounded-radius-full w-full h-full"
                  />
               )}
            </div>
         </div>
      </>
   );
};

export default UserAvatar;
