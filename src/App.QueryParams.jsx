import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {
  useQueryParams,
  StringParam,
  BooleanParam,
  withDefault,
} from 'use-query-params';

const App = () => {
  return (
    <>
      <h1>React Router</h1>

      <nav>
        <Link to="/home">Home</Link>
        <Link to="/bookshelf">Bookshelf</Link>
      </nav>

      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="bookshelf" element={<Bookshelf />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

const bySearch = (search) => (book) =>
  book.title
    .toLowerCase()
    .includes((search.title || '').toLowerCase()) &&
  book.isCompleted === search.isCompleted;

const Bookshelf = () => {
  const books = [
    {
      title: 'The Road to Rust',
      type: 'BOOK',
      isCompleted: true,
      rate: 5,
      stars: 2,
      edition: '3',
    },
    {
      title: 'The Road to Scala',
      type: 'DRAFT',
      isCompleted: false,
      rate: 4,
      stars: 3,
      edition: '1',
    },
  ];

  const [search, setSearch] = useQueryParams({
    title: withDefault(StringParam, ''),
    isCompleted: withDefault(BooleanParam, false),
  });

  const handleTitle = (event) => {
    setSearch({ title: event.target.value });
  };

  const handleIsCompleted = (event) => {
    setSearch({ isCompleted: event.target.checked });
  };

  console.log(search);

  return (
    <>
      <h2>Bookshelf</h2>

      <input
        type="text"
        value={search.title}
        onChange={handleTitle}
      />

      <Checkbox
        label="Is Completed?"
        value={search.isCompleted}
        onChange={handleIsCompleted}
      />

      <ul>
        {books.filter(bySearch(search)).map((book) => (
          <li key={book.title}>{book.title}</li>
        ))}
      </ul>
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

const NoMatch = () => {
  return (
    <>
      <h2>NoMatch</h2>
    </>
  );
};

const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};

export default App;
