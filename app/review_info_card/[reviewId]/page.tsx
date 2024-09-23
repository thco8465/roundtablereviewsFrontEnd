// app/review/[reviewId]/page.tsx

import React from 'react';
import ReviewInfoCardComponent from '../../components/reviewCard/review_info_card';
import Title from '../../components/Title/title';
import Header from '../../components/header/header';
import Layout from '../../components/layout/layout';

interface Review_Info {
    id: number;
    review_id: number;
    high: string;
    low: string;
    atmosphere: number;
    story: number;
    dev_note: string;
    gameplay: number;
    difficulty: number;
    username?: string;
    game_name: string;
    cover: string;
}

const ReviewInfoCard = ({ reviewData }: { reviewData: Review_Info }) => {
    return (
        <div>
            <Title />
            <Header />
            <Layout>
                <ReviewInfoCardComponent review={reviewData} />
            </Layout>
        </div>
    );
};

// Server-side data fetching
export async function getServerSideProps(context: { params: { reviewId: string } }) {
    const { reviewId } = context.params;
    console.log('reviewId: ', reviewId);
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/review/review/in-depth/${reviewId}`);
        console.log('response: ', response);
        if (!response.ok) {
            throw new Error('Review not found');
        }

        const reviewData = await response.json();

        return {
            props: { reviewData }, // Pass data to the page component
        };
    } catch (error) {
        console.error('Error fetching review info:', error);
        return {
            notFound: true, // Show a 404 page if there's an error
        };
    }
}

export default ReviewInfoCard;
