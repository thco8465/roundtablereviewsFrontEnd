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

// This function is executed on the server when this page is accessed
const ReviewInfoCard = async ({ params }: { params: { reviewId: string } }) => {
    const { reviewId } = params;

    let reviewData: Review_Info;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/review/review/in-depth/${reviewId}`);
        if (!response.ok) {
            throw new Error('Review not found');
        }

        reviewData = await response.json();
    } catch (error) {
        console.error('Error fetching review info:', error);
        // Handle the error as needed
        // You might want to throw an error here or return null
        return null; // Or return a 404 page if you have one
    }

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

// To enable fetching the reviewId from the URL
export const generateStaticParams = async () => {
    // This can be used to define dynamic routes if needed
    // For example, if you want to generate static pages for a list of review IDs
    // return [{ reviewId: '1' }, { reviewId: '2' }]; // Add more review IDs as necessary
    return [];
};

export default ReviewInfoCard;
