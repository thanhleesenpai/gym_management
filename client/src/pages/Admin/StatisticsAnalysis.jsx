import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heading, Loader, Subscription } from '../../components';
import { BASE_URL } from '../../utils/fetchData';
import { userImg } from "../../images";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const StatisticsAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [totalSubscribers, setTotalSubscribers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [planTypeCounts, setPlanTypeCounts] = useState({});
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState({});
  const [subscribersByMonth, setSubscribersByMonth] = useState([]);

  const fetchStatistics = async () => {
    try {
      setLoading(true);

      const subscriptionRes = await axios.get(`${BASE_URL}/api/v1/subscription/getall-subscription`);
      const feedbackRes = await axios.get(`${BASE_URL}/api/v1/feedback/getall-feedback`);

      if (subscriptionRes.data && subscriptionRes.data.success) {
        const subscriptions = subscriptionRes.data.subscriptions;

        // Kiểm tra dữ liệu trả về từ API
        console.log("Subscriptions:", subscriptions);

        // Calculate total subscribers and revenue
        setTotalSubscribers(subscriptions.length);
        setTotalRevenue(subscriptions.reduce((acc, sub) => acc + parseFloat(sub.planAmount || 0), 0));

        // Count plan types
        const planTypeCounts = {};
        const incomeByMonth = {};
        const subscribersByMonth = [];

        subscriptions.forEach((sub) => {
          planTypeCounts[sub.planType] = (planTypeCounts[sub.planType] || 0) + 1;

          const month = new Date(sub.createdAt).getMonth() + 1;
          const year = new Date(sub.createdAt).getFullYear();
          const key = `${year}-${month}`;

          if (!incomeByMonth[key]) {
            incomeByMonth[key] = 0;
          }
          incomeByMonth[key] += parseFloat(sub.planAmount || 0);

          subscribersByMonth.push({
            month: key,
            revenue: parseFloat(sub.planAmount || 0),
            user: sub.user || null,
            plan: sub.plan || null,
            planType: sub.planType || "Not Specified",
            createdAt: sub.createdAt || null,
          });
        });

        setPlanTypeCounts(planTypeCounts);
        setMonthlyIncome(incomeByMonth);
        setSubscribersByMonth(subscribersByMonth);
      }

      if (feedbackRes.data && feedbackRes.data.success) {
        const feedbacks = feedbackRes.data.feedbacks;

        // Calculate total feedbacks and average rating
        setTotalFeedbacks(feedbacks.length);
        const totalRating = feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0);
        setAverageRating(feedbacks.length > 0 ? (totalRating / feedbacks.length).toFixed(2) : 0);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching statistics:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className='pt-10 bg-blue-300'>
      <Heading name="Statistics Analysis" />
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-5 border border-white hover:bg-blue-600 transition-all">
            <h2 className="text-white font-bold text-2xl">Total Subscribers</h2>
            <p className="text-white text-lg">{totalSubscribers}</p>
          </div>
          <div className="p-5 border border-white hover:bg-blue-600 transition-all">
            <h2 className="text-white font-bold text-2xl">Total Revenue</h2>
            <p className="text-white text-lg">{totalRevenue} $</p>
          </div>
          <div className="p-5 border border-white hover:bg-blue-600 transition-all">
            <h2 className="text-white font-bold text-2xl">Plan Type Counts</h2>
            <ul className="text-white text-lg">
              {Object.entries(planTypeCounts).map(([type, count]) => (
                <li key={type}>{type}: {count}</li>
              ))}
            </ul>
          </div>
          <div className="p-5 border border-white hover:bg-blue-600 transition-all">
            <h2 className="text-white font-bold text-2xl">Average Rating</h2>
            <p className="text-white text-lg">{averageRating} ⭐</p>
          </div>
        </div>
        <div className="mt-10">
          <Heading name="Monthly Revenue Chart" />
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={Object.entries(monthlyIncome)
                .sort(([a], [b]) => new Date(a) - new Date(b)) // Sắp xếp theo thứ tự thời gian
                .map(([key, value]) => ({ month: key, revenue: value.toFixed(2) }))} // Chuẩn hóa dữ liệu cho biểu đồ
            >
              <XAxis dataKey="month" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Bar dataKey="revenue" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-10">
          <Heading name="Monthly Income and Subscribers" />
          {Object.entries(monthlyIncome)
            .sort(([a], [b]) => new Date(a) - new Date(b))
            .map(([key, value]) => (
              <div key={key} className="mb-10">
                <h2 className='text-white font-bold text-2xl mb-4'>Month: {key}</h2>
                <h3 className='text-white font-medium text-xl mb-4'>Income: {value.toFixed(2)} $</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {subscribersByMonth
                    .filter(sub => sub.month === key)
                    .map((subscriber, index) => (
                      <Subscription
                        key={index}
                        userImg={userImg}
                        userName={subscriber.user?.name || "Unknown"}
                        planName={subscriber.plan?.planName || "No Plan"}
                        planAmount={subscriber.revenue.toFixed(2)}
                        planType={subscriber.planType || "Not Specified"}
                        createdAt={subscriber.createdAt ? new Date(subscriber.createdAt).toLocaleDateString() : "Date Not Available"}
                      />
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsAnalysis;
