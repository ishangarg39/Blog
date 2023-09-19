import NavBar from './components/NavBar';
import {
  Route,
  Routes
} from "react-router-dom";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import SignUp from "./pages/SignUp";
import UserBlogs from './pages/UserBlogs';
import CreateBlog from './pages/CreateBlog';
import BlogDetails from './pages/BlogDetails';

function App() {
  return (
    <div >
      <NavBar />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/my-blogs" element={<UserBlogs />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
