import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userEmailState, userNameState } from 'store';
import toast from 'react-hot-toast';

const navlinks = [
  {
    title: 'ADD VIDEO',
    path: '/add-video',
  },
  {
    title: 'ALL VIDEOS',
    path: '/videos',
  },
];

export default function Navbar() {
  const userName = useRecoilValue(userNameState);
  const userEmail = useRecoilValue(userEmailState);

  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-4 py-3 shadow-md sticky top-0 bg-white">
      {/* left section */}
      <section>
        <Link to={'/'} className="text-3xl font-bold">
          Admin
        </Link>
      </section>

      {/* right section */}
      <section>
        {userEmail ? (
          <div className="flex items-center space-x-3">
            <div>
              <span className="text-gray-600 text-sm">Welcome </span>
              <span className="text-gray-600 font-semibold">{userName}</span>
            </div>
            <button
              className="btn"
              onClick={() => {
                localStorage.removeItem('token');
                toast.success('Logged out successfully');

                navigate('/signin');
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <button
              className="btn"
              onClick={() => {
                navigate('/signin');
              }}
            >
              Login
            </button>
            <button
              className="btn"
              onClick={() => {
                navigate('/signup');
              }}
            >
              Signup
            </button>
          </div>
        )}
      </section>
    </nav>
  );
}
