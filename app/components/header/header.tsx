"use client"; // This directive enables client component behavior
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt,
  faSignOutAlt,
  faHome,
  faGamepad,
  faUser,
  faPlus,
  faUserCircle,
  faUserPlus,
  faUsers
} from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter(); // Next.js's useRouter for programmatic navigation

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(Boolean(token)); // Update authentication state based on token presence
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    setIsAuthenticated(false); // Update authentication state
    router.push('/sign-in'); // Redirect to sign-in page
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/home">
              <FontAwesomeIcon icon={faHome} className={styles.faIcon} /> Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/reviewByGame">
              <FontAwesomeIcon icon={faGamepad} className={styles.faIcon} /> Find reviews By game title
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/reviewByUser">
              <FontAwesomeIcon icon={faUser} className={styles.faIcon} /> Find reviews By user
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/add-review">
              <FontAwesomeIcon icon={faPlus} className={styles.faIcon} /> Add Review
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/profile">
              <FontAwesomeIcon icon={faUserCircle} className={styles.faIcon} /> Profile
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/addFriend">
              <FontAwesomeIcon icon={faUserPlus} className={styles.faIcon} /> Add Friend
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/friendlist">
              <FontAwesomeIcon icon={faUsers} className={styles.faIcon} /> Friend List Status
            </Link>
          </li>
          {isAuthenticated ? (
            <li className={`${styles.navItem} ${styles.signOutItem}`}>
              <a onClick={handleSignOut} className={styles.signOutLink}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
              </a>
            </li>
          ) : (
            <li className={styles.navItem}>
              <Link href="/sign-in">
                <FontAwesomeIcon icon={faSignInAlt} /> Sign In
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
