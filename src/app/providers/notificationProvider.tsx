import React, { PropsWithChildren } from "react";

type NotificationProviderProps = PropsWithChildren;

const NotificationProvider = ({
   children,
}: NotificationProviderProps): React.JSX.Element => {
   return <>{children}</>;
};

export default NotificationProvider;
