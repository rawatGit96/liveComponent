/* eslint-disable react/prop-types */
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import SignIn from "Pages/Authentication/SignIn";
import ForgotPassword from "Pages/Authentication/ForgotPassword";
import ResetPassword from "Pages/Authentication/ResetPassword";
import ResetSuccessScreen from "Pages/Authentication/successScreen";
import Layout from "Pages/layout";
import { useSelector } from "react-redux";
import ProfileSection from "Pages/ProfileSection/profileCard";
import ProfileEditSection from "Pages/ProfileSection/profileEditForm";
import OTPScreen from "Pages/Authentication/OTP/otpScreen";
import { ForgotPasswordEmail } from "Pages/Authentication/ForgotPassword";
import CommentSection from "Pages/Comments";
import Analytics from "Pages/Analytics";
import OverViewDetail from "Pages/Analytics/OverViewDetail";
import Earnings from "Pages/Earnings";
import Support from "Pages/Support";
import Dashboard from "Pages/Dashboard";
import ContentSection from "Pages/Content";
import SeriesEpisode from "Pages/Content/seriesEpisode";
import ContentUpload from "Pages/Content/UploadContent/uploadForm";
import ReviewCover from "Pages/Content/reviewCover";
import ReviewContent from "Pages/Content/reviewContent";
import EditUploadContent from "Pages/Content/UploadContent/editContentForm";
import ScheduleEvent from "Pages/Content/Events/scheduleEventForm";
import ScheduleContent from "Pages/Content/ScheduleContent/scheduleContentForm";
import CreateSeries from "Pages/Content/Series/seriesForm";
import ManageSeries from "Pages/Content/Series/managerSeries";
import EditEpisode from "Pages/Content/Series/editEpisode";
import DetailsView from "Pages/Content/detailView";

function PublicRoute({ isAuthenticated }) {
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

function PrivateRoute({ isAuthenticated }) {
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <Outlet />;
}

function App() {
  const { token } = useSelector((e) => e?.signIn?.data) || {};

  return (
    <Routes>
      <Route element={<PublicRoute isAuthenticated={token} />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/forgot-password-email"
          element={<ForgotPasswordEmail />}
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/reset-password-success"
          element={<ResetSuccessScreen />}
        />
        <Route path="/otp-screen" element={<OTPScreen />} />
      </Route>
      <Route element={<PrivateRoute isAuthenticated={token} />}>
        <Route path="" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile-management" element={<ProfileSection />} />
          <Route path="/content-management" element={<ContentSection />} />
          <Route
            path="/content-management/series/episodes"
            element={<SeriesEpisode />}
          />
          <Route path="/content-upload" element={<ContentUpload />} />
          <Route path="/details" element={<DetailsView/>} />
          <Route path="/edit-content" element={<EditUploadContent />} />
          <Route path="/review-cover" element={<ReviewCover />} />
          <Route path="/review-content" element={<ReviewContent />} />

          <Route path="/schedule-event" element={<ScheduleEvent />} />
          <Route path="/schedule-content" element={<ScheduleContent />} />
          <Route path="/create-series" element={<CreateSeries />} />
          <Route path="/edit-series" element={<ManageSeries />} />
          <Route path="/edit-episode" element={<EditEpisode />} />

          <Route path="/profile-edit" element={<ProfileEditSection />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route
            path="/analytics/overview-detail"
            element={<OverViewDetail />}
          />
          <Route path="/comments" element={<CommentSection />} />
          <Route path="/earnings" element={<Earnings />} />
          <Route path="/billings" element={<div>billings</div>} />
          <Route path="/support" element={<Support />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
