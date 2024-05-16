import React, { useState, useEffect } from 'react';

const UserProfile = ({ userToken }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:8000/user-info', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userToken}`, 
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user information');
        }
        const data = await response.json();
        setUserInfo(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserInfo();
  }, [userToken]); 

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>Name:</strong> {userInfo.name}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
      {/* Add more fields as necessary */}
    </div>
  );
};

export default UserProfile;
