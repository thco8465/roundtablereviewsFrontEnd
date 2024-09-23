// components/ReviewForm.tsx
"use client"; // This directive enables client component behavior
import React, { useState, useEffect } from 'react';
import styles from './reviewForm.module.css'; // Adjust the path as needed

interface ReviewFormData {
  gameId: string | null;
  game_name: string;
  review: string;
  timeSpent: string;
  rating: number;
  date: string | null;
  userId: number | null;
}

interface InDepthData {
  review_id: number;
  high: string;
  low: string;
  atmosphere: number;
  story: number;
  dev_note: string;
  gameplay: number;
  difficulty: number;
  [key: string]: any; // or a more specific type instead of `any`
}

interface Game {
  gameId: string;
  title: string;
  cover: string;
}

interface Props {
  selectedGame: Game | null;
}

const ReviewForm: React.FC<Props> = ({ selectedGame }) => {
  const [formData, setFormData] = useState<ReviewFormData>({
    gameId: selectedGame?.gameId || '',
    game_name: selectedGame?.title || '',
    review: '',
    timeSpent: '',
    rating: 1,
    date: new Date().toISOString().split('T')[0],
    userId: null,
  });

  const [inDepth, setInDepth] = useState<InDepthData>({
    review_id: 0,
    high: '',
    low: '',
    atmosphere: 1,
    story: 1,
    dev_note: '',
    gameplay: 1,
    difficulty: 1,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async (): Promise<number | null> => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/me`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.id;
      } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
      }
    };

    const initializeFormData = async () => {
      const userId = await fetchUserData();
      if (userId) {
        setFormData(prevState => ({
          ...prevState,
          userId: userId,
        }));
      }
    };
    initializeFormData();
  }, []);

  useEffect(() => {
    if (selectedGame) {
      setFormData(prevState => ({
        ...prevState,
        gameId: selectedGame.gameId,
        game_name: selectedGame.title,
      }));
    }
  }, [selectedGame]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: id === 'rating' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rating < 1 || formData.rating > 10) {
      alert('Rating must be between 1 and 10');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/review/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      const reviewId = result.id;

      setInDepth(prevState => ({
        ...prevState,
        review_id: reviewId,
      }));

      const inDepthResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/review/review/in-depth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...inDepth, review_id: reviewId }),
      });

      if (!inDepthResponse.ok) {
        throw new Error('Failed to submit in-depth review');
      }

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/reviewCount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const expIncrease = 10;
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/exp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ exp: expIncrease }),
      });

      setFormData({
        gameId: null,
        game_name: '',
        review: '',
        timeSpent: '',
        rating: 1,
        date: new Date().toISOString().split('T')[0],
        userId: null,
      });

    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.reviewCard}>
      <h3 className={styles.title}>Add Your Review</h3>
      <form onSubmit={handleSubmit} className={styles.reviewForm}>
        <div className={styles.formGroup}>
          <label htmlFor="review">Your Review</label>
          <textarea
            id="review"
            rows={4}
            value={formData.review}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="high">High Point</label>
          <input
            id="high"
            type="text"
            value={inDepth.high}
            onChange={(e) => setInDepth(prevState => ({ ...prevState, high: e.target.value }))}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="low">Low Point</label>
          <input
            id="low"
            type="text"
            value={inDepth.low}
            onChange={(e) => setInDepth(prevState => ({ ...prevState, low: e.target.value }))}
          />
        </div>

        {['atmosphere', 'story', 'gameplay', 'difficulty'].map((field) => (
          <div className={styles.formGroup} key={field}>
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)} (1-10)</label>
            <input
              id={field}
              type="number"
              min="1"
              max="10"
              value={inDepth[field]}
              onChange={(e) => setInDepth(prevState => ({ ...prevState, [field]: Number(e.target.value) }))}
            />
          </div>
        ))}

        <div className={styles.formGroup}>
          <label htmlFor="dev_note">Note to Developer</label>
          <input
            id="dev_note"
            type="text"
            value={inDepth.dev_note}
            onChange={(e) => setInDepth(prevState => ({ ...prevState, dev_note: e.target.value }))}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="rating">Overall rating (1-10)</label>
          <input
            id="rating"
            type="number"
            min="1"
            max="10"
            value={formData.rating}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="timeSpent">Time Spent (hours)</label>
          <input
            id="timeSpent"
            type="number"
            min="0"
            step="0.1"
            value={formData.timeSpent}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={formData.date || ''}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Submit Review
        </button>
      </form>
      {loading && <div className={styles.spinner}>Loading...</div>}
    </div>
  );
};

export default ReviewForm;
