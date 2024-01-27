import { Route, Routes } from "react-router-dom";
import Layout from "./component/layout/Layout";
import { Category, BlogDetail, WriterPage, Home, LoginPage, SignupPage } from "./screens/index";
import {Loading} from './component/index'
import {useStoreTheme} from "./store/useStore";
const App = () => {
  const{theme,isLoading}=useStoreTheme()
  return (
    <main className={theme}>
      <div className="w-ful min-h-screen relative bg-white dark:bg-[#020b19]">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/:slug/:id?" element={<BlogDetail />} />
            <Route path="/writer/:id" element={<WriterPage />} />
          </Route>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
        </Routes>
        {isLoading && <Loading/>}
      </div>
    </main>
  );
};

export default App;
