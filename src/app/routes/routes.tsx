import {
   HashRouter as Router,
   Route,
   createBrowserRouter,
   createRoutesFromElements,
} from "react-router-dom";
import ProtectedRoute from "../../features/auth/components/protected_route";

const routes = createRoutesFromElements(
   <>
      <Route path="/" element={<div>hello world!</div>} />
   </>
);

export const router = createBrowserRouter(routes);
