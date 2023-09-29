import { Routes, Route, useNavigate } from 'react-router-dom';
import { Signin, Signup } from 'ui';
import Navbar from './components/Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from 'store';
import Home from './components/Home';

const BASE_URL = 'http://localhost:8000/api';

function App() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const getAdminProfile = async () => {
    const res = await axios.get(`${BASE_URL}/admin/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    setUser({
      userName: res.data.admin.name,
      userEmail: res.data.admin.email,
      isLoading: false,
    });
  };

  useEffect(() => {
    getAdminProfile();
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/signup"
          element={
            <Signup
              title={'admin'}
              onClick={async (fullname, email, password) => {
                await axios.post(
                  `${BASE_URL}/admin/register`,
                  {
                    name: fullname,
                    email: email,
                    password: password,
                  },

                  { withCredentials: true }
                );
                toast.success('Account created successfully');
                navigate('/signin');
              }}
            />
          }
        />
        <Route
          path="/signin"
          element={
            <Signin
              title={'admin'}
              onClick={async (email, password) => {
                const res = await axios.post(`${BASE_URL}/admin/login`, {
                  email: email,
                  password: password,
                });
                localStorage.setItem('token', res.data.token);

                toast.success('Logged in successfully');
                navigate('/');
                window.location.reload();
              }}
            />
          }
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
