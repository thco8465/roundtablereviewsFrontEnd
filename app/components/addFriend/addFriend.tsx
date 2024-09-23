// pages/add-friend.js
"use client"; // This directive enables client component behavior
import React, { useState } from 'react';
import FriendSearch from './friendSearch'; // Adjust the path as needed
import FriendButton from './friendButton'; // Adjust the path as needed
import styles from '../styles/addFriend.module.css'; // Adjust the path as needed

interface User {
  id: number;
  username: string;
}

const AddFriendPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Find Friends</h1>
      <FriendSearch onUserSelect={setSelectedUser} />
      {selectedUser && <FriendButton selectedUser={selectedUser} />}
    </div>
  );
};

export default AddFriendPage;
