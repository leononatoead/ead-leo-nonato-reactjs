import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Global/Home';
import Profile from '../pages/Global/Profile';
import HomeCourses from '../pages/Global/Courses';
import Course from '../pages/Global/Course';
import CourseWatch from '../pages/Global/CourseWatch';
import Newsletter from '../pages/Global/Newsletter';
import NewsletterPost from '../pages/Global/Newsletter/NewsletterPost';
import FAQ from '../pages/Global/FAQ';

import Dashboard from '../pages/Admin/Dashboard';
import Courses from '../pages/Admin/Courses';
import CourseDetails from '../pages/Admin/Courses/CourseDetails';
import NewCourse from '../pages/Admin/Courses/NewCourse';
import EditCourse from '../pages/Admin/Courses/EditCourse';
import NewVideo from '../pages/Admin/Courses/CourseDetails/NewVideo';
import EditVideo from '../pages/Admin/Courses/CourseDetails/EditVideo';
import DashboardFAQ from '../pages/Admin/FAQ';
import NewQuestion from '../pages/Admin/FAQ/NewQuestion';
import EditQuestion from '../pages/Admin/FAQ/EditQuestion';
import Forms from '../pages/Admin/Forms';
import NewForm from '../pages/Admin/Forms/NewForm';
import EditForm from '../pages/Admin/Forms/EditForm';
import Posts from '../pages/Admin/Posts';
import NewPost from '../pages/Admin/Posts/NewPost';
import EditPost from '../pages/Admin/Posts/EditPost';
import SearchPosts from '../pages/Global/SearchPosts';
import SearchCourses from '../pages/Global/SearchCourses';
import HomePanel from '../pages/Admin/HomePanel';
import NewBanner from '../pages/Admin/HomePanel/Banners/NewBanner';
import EditBanner from '../pages/Admin/HomePanel/Banners/EditBanner';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/courses/:id' element={<HomeCourses />} />
      <Route path='/course/:id' element={<Course />} />
      <Route path='/course/:id/:id' element={<CourseWatch />} />
      <Route path='/newsletter' element={<Newsletter />} />
      <Route path='/newsletter/post/:id' element={<NewsletterPost />} />
      <Route path='/faq' element={<FAQ />} />
      <Route path='/courses/search/:id' element={<SearchCourses />} />
      <Route path='/newsletter/search/:id' element={<SearchPosts />} />

      <Route path='/profile' element={<Profile />} />
      <Route path='/dashboard' element={<Dashboard />}>
        <Route path='/dashboard' element={<Courses />} />
        <Route path='home' element={<HomePanel />} />
        <Route path='home/banners/new' element={<NewBanner />} />
        <Route path='home/banners/edit/:id' element={<EditBanner />} />
        <Route path='courses' element={<Courses />} />
        <Route path='courses/:id' element={<CourseDetails />} />
        <Route path='courses/new' element={<NewCourse />} />
        <Route path='courses/:id/edit' element={<EditCourse />} />
        <Route path='courses/:id/new' element={<NewVideo />} />
        <Route path='courses/:id/edit/:id' element={<EditVideo />} />
        <Route path='posts' element={<Posts />} />
        <Route path='posts/new' element={<NewPost />} />
        <Route path='posts/edit/:id' element={<EditPost />} />
        <Route path='forms' element={<Forms />} />
        <Route path='forms/new' element={<NewForm />} />
        <Route path='forms/edit/:id' element={<EditForm />} />
        {/* <Route path='users' element={<Users />} /> */}
        <Route path='faq' element={<DashboardFAQ />} />
        <Route path='faq/new' element={<NewQuestion />} />
        <Route path='faq/edit/:id' element={<EditQuestion />} />
      </Route>

      <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  );
}
