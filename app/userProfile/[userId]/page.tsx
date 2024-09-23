import React from 'react';
import UserProfile from '../../components/profile/userProfile'; // Adjust path as needed
import Title from '../../components/Title/title';
import Header from '../../components/header/header';
import Layout from '../../components/layout/layout';
import { useRouter } from 'next/router';

const UserProfilePage: React.FC = () => {
  const router = useRouter();
  const { userId } = router.query; // Get userId from query parameters
  const userIdNumber = userId ? parseInt(userId as string, 10) : undefined;

  return (
    <div>
      <Title />
      <Header />
      <Layout>
        {userIdNumber !== undefined ? (
          <UserProfile userId={userIdNumber} />
        ) : (
          <p>User not found</p> // Handle the case where userId is undefined
        )}
      </Layout>
    </div>
  );
};

export default UserProfilePage;
