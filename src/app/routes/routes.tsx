import {
   HashRouter as Router,
   Route,
   createHashRouter,
   createRoutesFromElements,
   Navigate,
} from "react-router-dom";
import ProtectedRoute from "../../features/auth/components/protected_route";

const routes = createRoutesFromElements(
   <>
      <Route path="*" element={<div>Error Not Found</div>} />
      <Route path="/" element={<Navigate to={"/login"}></Navigate>} />
      <Route path="/login" element={<ProtectedRoute>login!</ProtectedRoute>} />
   </>
);

export const router = createHashRouter(routes);
