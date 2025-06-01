import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from '..';
import { BASE_URL } from '../../utils/fetchData';

const TrainerRoute = () => {
    const [ok, setOk] = useState(false);
    const { auth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/v1/auth/trainer-auth`);


                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                    navigate("/unauthorized"); // hoặc chuyển hướng tới trang lỗi
                }
            } catch (error) {
                console.error("TrainerRoute Error:", error);
                setOk(false);
                navigate("/unauthorized");
            }
        };

        if (auth?.token) {
            authCheck();
        }
    }, [auth?.token, navigate]);

    return ok ? <Outlet /> : <Spinner />;
};

export default TrainerRoute;