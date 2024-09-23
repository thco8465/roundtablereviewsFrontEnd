// components/FriendSearch.js
"use client"; // This directive enables client component behavior

import React, { useState } from 'react';
import styles from './friendSearch.module.css'; // Adjust the path as needed

interface User {
  id: number;
  username: string;
}

interface FriendSearchProps {
  onUserSelect: (user: User) => void;
}

const FriendSearch: React.FC<FriendSearchProps> = ({ onUserSelect }) => {
  const [query, setQuery] = useState<string>(''); 
  const [results, setResults] = useState<User[]>([]); 

  const searchUsers = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/search-user?username=${query}`);
    const data: User[] = await res.json(); 
    setResults(data);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a username"
        className={styles.input}
      />
      <button onClick={searchUsers} className={styles.button}>Search</button>
      <ul className={styles.resultsList}>
        {results.map(user => (
          <li key={user.id} className={styles.user}>
            <span className={styles.username}>{user.username}</span>
            <button className={styles.selectButton} onClick={() => onUserSelect(user)}>Select User</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendSearch;
