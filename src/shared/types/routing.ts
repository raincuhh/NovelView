export enum RouteTypes {
   public,
   auth,
   protected,
   admin,
}

export type RouteListProps = {
   id: string;
   path: string;
   element: JSX.Element;
   errorElement?: JSX.Element;
   routeType?: RouteTypes;
};
