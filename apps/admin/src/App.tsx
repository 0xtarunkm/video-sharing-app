import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Signin, Signup } from 'ui';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/signup"
            element={
              <Signup
                title={'admin'}
                onClick={() => {
                  console.log('signup');
                }}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Signin
                title={'admin'}
                onClick={() => {
                  console.log('signin');
                }}
              />
            }
          />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
