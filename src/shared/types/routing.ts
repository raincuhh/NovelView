export enum RouteTypes {
   public, // public route.
   auth, // redirects if authenticated
   protected, // needs to be authenticated
   admin, // needs userrole to be admin
}
