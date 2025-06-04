import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Heading, Loader } from '../../components';
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/fetchData";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const AdminDashBoard = () => {
  const [userCount, setUserCount] = useState(null);
  const [planCount, setPlanCount] = useState(null);
  const [subscriberCount, setSubscriberCount] = useState(null);
  const [contactCount, setContactCount] = useState(null);
  const [feedbackCount, setFeedbackCount] = useState(null);
  const [monthlyIncome, setMonthlyIncome] = useState(null);
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(false);

  // AOS Initialization
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: 'ease-in-out', // Animation easing
      offset: 120, // Trigger animation before the element comes into view
      once: true // Animation should happen only once while scrolling down
    });

    // Fetch data
    getUsers();
    getPlans();
    getSubscriptions();
    getContacts();
    getFeedbacks();
    getMonthlyIncome();
    getFeedbackList();
  }, []);

  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/auth/total-user`);
      if (res.data && res.data.success) {
        setUserCount(res.data.total);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting users");
      setLoading(false);
    }
  }

  const getPlans = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/plan/total-plan`);
      if (res.data && res.data.success) {
        setPlanCount(res.data.total);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting plans");
      setLoading(false);
    }
  }

  const getSubscriptions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/subscription/total-subscription`);
      if (res.data && res.data.success) {
        setSubscriberCount(res.data.total);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting subscription");
      setLoading(false);
    }
  }

  const getContacts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/contact/total-contact`);
      if (res.data && res.data.success) {
        setContactCount(res.data.total);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting contact");
      setLoading(false);
    }
  }

  const getFeedbacks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/feedback/total-feedback`);
      if (res.data && res.data.success) {
        setFeedbackCount(res.data.total);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting feedback");
      setLoading(false);
    }
  }

  const getMonthlyIncome = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/subscription/getall-subscription`);
      if (res.data && res.data.success) {
        const subscriptions = res.data.subscriptions;
        const incomeByMonth = {};

        subscriptions.forEach((subscription) => {
          const month = new Date(subscription.createdAt).getMonth() + 1; // Lấy tháng từ createdAt
          const year = new Date(subscription.createdAt).getFullYear(); // Lấy năm từ createdAt
          const key = `${month}-${year}`; // Tạo key dạng "tháng-năm"

          if (!incomeByMonth[key]) {
            incomeByMonth[key] = 0;
          }
          incomeByMonth[key] += parseFloat(subscription.planAmount); // Cộng doanh thu vào tháng tương ứng
        });

        setMonthlyIncome(incomeByMonth);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting statistics analysis");
      setLoading(false);
    }
  };

  const getFeedbackList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/feedback/getall-feedback`);
      if (res.data && res.data.success) {
        setFeedbackList(res.data.feedbacks);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting feedbacks");
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />
  }

  return (
    <section className='pt-10 bg-gray-900'>
      <Heading name="Admin Dashboard" />
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          <Link className='p-5 border border-white hover:bg-blue-600 transition-all' to={`/dashboard/admin/user-list`} data-aos="fade-up">
            <h2 className='text-white font-bold text-3xl'>Users: {userCount !== null ? userCount : "Loading..."}</h2>
          </Link>
          <Link className='p-5 border border-white hover:bg-blue-600 transition-all' to={`/dashboard/admin/subscriber-list`} data-aos="fade-up" data-aos-delay="100">
            <h2 className='text-white font-bold text-3xl'>Subscribers: {subscriberCount !== null ? subscriberCount : "Loading..."}</h2>
          </Link>
          <Link className='p-5 border border-white hover:bg-blue-600 transition-all' to={`/dashboard/admin/plans`} data-aos="fade-up" data-aos-delay="200">
            <h2 className='text-white font-bold text-3xl'>Plans: {planCount !== null ? planCount : "Loading..."}</h2>
          </Link>
          <Link className='p-5 border border-white hover:bg-blue-600 transition-all' to={`/dashboard/admin/contact-us`} data-aos="fade-up" data-aos-delay="300">
            <h2 className='text-white font-bold text-3xl'>Queries: {contactCount !== null ? contactCount : "Loading..."}</h2>
          </Link>
          {feedbackCount !== null && (
            <Link className='p-5 border border-white hover:bg-blue-600 transition-all' to={`/dashboard/admin/feedbacks`} data-aos="fade-up" data-aos-delay="400">
              <h2 className='text-white font-bold text-3xl'>Feedbacks: {feedbackCount !== null ? feedbackCount : "Loading..."}</h2>
            </Link>
          )}
          <Link className='p-5 border border-white hover:bg-blue-600 transition-all' to={`/dashboard/admin/statistics-analysis`} data-aos="fade-up" data-aos-delay="500">
            <h2 className='text-white font-bold text-3xl'>Statistics Analysis</h2>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AdminDashBoard;
