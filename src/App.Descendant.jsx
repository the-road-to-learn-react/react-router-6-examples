import {
  Routes,
  Route,
  Outlet,
  Link,
  useParams,
} from 'react-router-dom';

const App = () => {
  const users = [
    { id: '1', firstName: 'Robin', lastName: 'Wieruch' },
    { id: '2', firstName: 'Sarah', lastName: 'Finnley' },
  ];

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="users/*" element={<Users users={users} />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

export const Layout = () => {
  return (
    <>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Link to="/home">Home</Link>
        <Link to="/users">Users</Link>
      </nav>

      <main style={{ padding: '1rem 0' }}>
        <Outlet />
      </main>
    </>
  );
};

export const Home = () => {
  return (
    <>
      <h1>Home</h1>

      <p>Public Page</p>
    </>
  );
};

export const Users = ({ users }) => {
  return (
    <>
      <h2>Users</h2>

      <Routes>
        <Route index element={<UserList users={users} />} />
        <Route path=":userId" element={<UserItem users={users} />} />
      </Routes>

      <Outlet />
    </>
  );
};

export const UserList = ({ users }) => {
  return (
    <>
      <h2>User List</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={user.id}>
              {user.firstName} {user.lastName}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export const UserItem = () => {
  const { userId } = useParams();

  return (
    <>
      <h2>User Item: {userId}</h2>

      <Link to="/users">Back to Users</Link>
    </>
  );
};

export const NoMatch = () => {
  return (
    <>
      <p>There's nothing here!</p>
    </>
  );
};

export default App;
