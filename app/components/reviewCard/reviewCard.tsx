import React from 'react';
import Link from 'next/link';
import styles from './reviewCard.module.css';

interface Review {
  id: number;
  rating: number;
  review: string;
  date: string;
  game_name: string;
  time_spent: number;
  cover: string; // Add cover image URL
  username?: string; // Optional username
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const imageUrl = review.cover.replace('{width}', '100').replace('{height}', '150');
  
  return (
    <div className={styles.reviewCard}>
      {/* Cover image of the game */}
      <div className={styles.reviewCard__cover}>
        <img src={imageUrl} alt={review.game_name} />
      </div>

      <h3 className={styles.gameTitle}>{review.game_name}</h3>
      <p className={styles.rating}><strong>Rating:</strong> {review.rating}/10</p>
      <p className={styles.reviewText}><strong>Review:</strong> {review.review}</p>
      <p className={styles.timeSpent}><strong>Playtime:</strong> {review.time_spent} hours</p>
      {review.username && (
        <p className={styles.username}><strong>Username:</strong> {review.username}</p>
      )}
      <p className={styles.date}><strong>Date:</strong> {new Date(review.date).toLocaleDateString()}</p>
      
      {/* Use Next.js <Link> component for navigation */}
      <Link href={`/review_info_card/${review.id}`} passHref>
        <a className={styles.detailsLink}>Detail</a>
      </Link>
    </div>
  );
};

export default ReviewCard;
