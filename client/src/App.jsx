import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Footer, ScrollButton, PrivateRoute, AdminRoute, Modal } from "./components";
import { Register, Login, ForgotPassword, Home, PlanSubscription, Error, Exercise, ExerciseDetail, Profile, UserDashBoard, PlanDetail, AdminDashBoard, CreatePlan, UpdatePlan, Plans, SubscriberList, UserList, FavouriteExercises, PlanDetails, PlanFullDetail, ContactUs, TrainerDetails, Feedback, Feedbacks, FeedbackList} from "./pages";
// import PlanFullDetail from './pages/User/planFullDetail';
import { Toaster } from 'react-hot-toast';
import { useAuth } from "./context/auth";
// import axios from 'axios';

const App = () => {
  const { auth, setAuth } = useAuth();


  return (
    <BrowserRouter>
      <ScrollButton />
      <Header />
      <Toaster />
      <Modal/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/exercise' element={auth?.user ? <Exercise /> : <Login />} />
        <Route path='/exercise/:id' element={auth?.user ? <ExerciseDetail /> : <Login />} />
        <Route path='/plan-subscribe/:planid' element={<PlanSubscription/>} />
        <Route path='/plan-detail/:planid' element={<PlanDetails/>} />
        <Route path='/trainer/:trainerId' element={<TrainerDetails/>} />
        <Route path='/feedback' element={<Feedback/>} />

        <Route path='*' element={<Error />} />

        {/* user routes =========================== */}
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<UserDashBoard />} />
          <Route path='user/profile' element={<Profile />} />
          <Route path='user/plan-detail' element={<PlanDetail />} />
          <Route path='user/plan-detail-full/:planid' element={<PlanFullDetail/>} />
          <Route path='user/favourite-exercises' element={<FavouriteExercises/>} />
          <Route path='user/feedbacks' element={<Feedbacks/>} />

        </Route>


        {/* admin routes ================================== */}

        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin' element={<AdminDashBoard />} />
          <Route path='admin/profile' element={<Profile />} />
          <Route path='admin/create-plane' element={<CreatePlan />} />
          <Route path='admin/plan/:planid' element={<UpdatePlan />} />
          <Route path='admin/plans' element={<Plans />} />
          <Route path='admin/user-list' element={<UserList />} />
          <Route path='admin/contact-us' element={<ContactUs />} />
          <Route path='admin/subscriber-list' element={<SubscriberList />} />
          <Route path='admin/feedbacks' element={<FeedbackList />} />
         
        </Route>

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;


