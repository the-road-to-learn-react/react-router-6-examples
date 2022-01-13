import * as React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

const App = () => {
  return (
    <>
      <h1>React Router</h1>

      <nav>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

const Home = () => {
  return (
    <>
      <h2>Home</h2>
    </>
  );
};

const About = () => {
  const shouldRedirect = true;

  const navigate = useNavigate();

  React.useEffect(() => {
    if (shouldRedirect) {
      navigate('/home');
    }
  });

  return (
    <>
      <h2>About</h2>
    </>
  );
};

const NoMatch = () => {
  return <p>There's nothing here: 404!</p>;
};

export default App;
