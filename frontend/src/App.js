import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';
import LoginPage from './pages/LoginPage'
import HomePage, { loader as homePageLoader } from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import './App.css';
import UserContextProvider from './components/UserContext';
import ProfilePage from './pages/ProfilePage';
import ProfilePostsPage, { loader as profilePostsPageLoader } from './pages/ProfilePostsPage';
import ProfileLayout from './layouts/ProfileLayout';
import CreatePost from './pages/CreatePost';
import SinglePostPage, { loader as singlePostPageLoader } from './pages/SinglePostPage';
import AuthorPostPage, { loader as authorPostPageLoader } from './pages/AuthorPostPage';
import ErrorBoundary from './components/ErrorBoundary';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<BaseLayout />} errorElement={<ErrorBoundary />}>
    <Route index element={<HomePage />} loader={homePageLoader} />
    <Route path='login' element={<LoginPage />} />
    <Route path='register' element={<RegisterPage />} />
    <Route path='profile' element={<ProfileLayout />}>
      <Route index element={<ProfilePage />} />
      <Route path='posts' element={<ProfilePostsPage />} loader={profilePostsPageLoader} />
    </Route>
    <Route path="create" element={<CreatePost />} />
    <Route path='/post/:url' element={<SinglePostPage />} loader={singlePostPageLoader} />
    <Route path='author/:username' element={<AuthorPostPage />} loader={authorPostPageLoader} />
    <Route path='*' element={<>404 Not Found</>} />
  </Route>
))


function App() {


  return (

    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>

  );
}

export default App;
