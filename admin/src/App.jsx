import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import useStore from "./store";
import {
  StartPage,
  OTPVerification,
  Dashboard,
  Content,
  Followers,
  Analytics,
  WritePost,
} from "./screen/index";
function Layout() {
  const { user } = useStore((state) => state);
  const location = useLocation();

  return user?.token ? (
    <div className="w-full h-screen">
      <Navbar />
      <div className="w-full h-full flex border-t pt-16">
        <div className="hidden lg:flex">
          <Sidebar />
        </div>
        <div className="w-full flex-1 px-8 py-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
}

function App() {
  return (
    <main className="w-full min-h-screen">
      <Routes>
      <Route path="/auth" element={<StartPage />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route element={<Layout />}>
          <Route index path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/content" element={<Content />} />
          <Route path="/followers" element={<Followers />} />
          <Route path="/write/:postId?" element={<WritePost />} />
        </Route>
        
      </Routes>
    </main>
  );
}

export default App;
