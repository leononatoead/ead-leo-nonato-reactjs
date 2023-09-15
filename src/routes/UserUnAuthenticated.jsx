import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Global/Home";
import Register from "../pages/Auth/Register";
import ChangePasswordSuccess from "../pages/Auth/ChangePasswordSuccess";
import FAQ from "../pages/Global/FAQ";
import Course from "../pages/Global/Course";
import Newsletter from "../pages/Global/Newsletter";
import CourseWatch from "../pages/Global/CourseWatch";
import VerifySucess from "../pages/Auth/VerifySuccess";

export default function UserUnAuthenticatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/faq" element={<FAQ />} />

      {/* <Route path="/verify-sucess" element={<VerifySucess />} /> */}
      <Route path="/course/:id" element={<Course />} />
      <Route path="/course/:id/:id" element={<CourseWatch />} />
      <Route path="/newsletter" element={<Newsletter />} />
      <Route
        path="/change-password-success"
        element={<ChangePasswordSuccess />}
      />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
}
