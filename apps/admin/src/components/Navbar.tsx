import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userEmailState } from 'store';
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
  const userEmail = useRecoilValue(userEmailState);
  console.log(userEmail);

  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-4 py-3 shadow-md">
      {/* left section */}
      <section>
        <Link to={'/'} className="text-3xl font-bold">
          Admin
        </Link>
      </section>

      {userEmail && (
        <div>
          <ul className="flex items-center font-bold">
            {navlinks.map((link) => (
              <li key={link.title}>
                <Link
                  to={link.path}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:underline duration-200"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* right section */}
      <section>
        {userEmail ? (
          <div>
            <button
              className="btn"
              onClick={() => {
                localStorage.removeItem('token');
                toast.success('Logged out successfully');

                navigate('/signin');
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
