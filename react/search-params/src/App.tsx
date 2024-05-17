import React, { useState } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="users">
        <Route path=":userId" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}
function Home() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(100)
  const gotoProfilePage = () => {
    navigate(`/users/${userId}`); // 跳转到其他用户的 ProfilePage
  };
  return (
    <div>
      <button onClick={gotoProfilePage}>Go to User Profile</button>
    </div>
  );
}
function ProfilePage() {
  let { userId } = useParams();
  console.log(userId)
}
export default App;
