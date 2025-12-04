import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Review {
    author_name: string;
    rating: number;
    text: {
        text: string;
        languageCode: string;
    };
    time: number;
    profile_photo_url?: string;
    relative_time_description: string;
}

interface PlaceDetails {
    rating: number;
    user_ratings_total: number;
    reviews: Review[];
}

const GoogleReviews = () => {
    const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
                const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID;

                if (!apiKey || !placeId) {
                    throw new Error("Missing Google Places API configuration");
                }

                // Using Places API (New) - Place Details
                const response = await fetch(
                    `https://places.googleapis.com/v1/places/${placeId}`,
                    {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json",
                            "X-Goog-Api-Key": apiKey,
                            "X-Goog-FieldMask": "rating,userRatingCount,reviews"
                        },
                    }
                );

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("API Error:", errorText);
                    throw new Error(`Failed to fetch reviews: ${response.status}`);
                }

                const data = await response.json();
                console.log("API Response:", data);

                setPlaceDetails({
                    rating: data.rating || 0,
                    user_ratings_total: data.userRatingCount || 0,
                    reviews: data.reviews || [],
                });
            } catch (err) {
                console.error("Error fetching Google reviews:", err);
                setError(err instanceof Error ? err.message : "Failed to load reviews");
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    const renderStars = (rating: number) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`h-5 w-5 ${star <= rating
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted"
                            }`}
                    />
                ))}
            </div>
        );
    };

    if (loading) {
        return (
            <section className="py-20 bg-card">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <div className="animate-pulse">
                            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
                            <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return null; // Silently fail - don't show error to users
    }

    if (!placeDetails || !placeDetails.reviews || placeDetails.reviews.length === 0) {
        return null;
    }

    return (
        <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
                    <div className="flex items-center justify-center gap-3 mb-2">
                        {renderStars(Math.round(placeDetails.rating))}
                        <span className="text-2xl font-bold">{placeDetails.rating.toFixed(1)}</span>
                    </div>
                    <p className="text-muted-foreground">
                        Based on {placeDetails.user_ratings_total} Google reviews
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {placeDetails.reviews.slice(0, 6).map((review, index) => (
                        <Card
                            key={index}
                            className="border-border hover:border-primary transition-all duration-300"
                        >
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-4 mb-4">
                                    {review.profile_photo_url && (
                                        <img
                                            src={review.profile_photo_url}
                                            alt={review.author_name}
                                            className="w-12 h-12 rounded-full"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{review.author_name}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {review.relative_time_description}
                                        </p>
                                    </div>
                                </div>
                                <div className="mb-3">{renderStars(review.rating)}</div>
                                <p className="text-muted-foreground text-sm line-clamp-4">
                                    {review.text.text}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <a
                        href="https://www.google.com/maps/search/?api=1&query=Google&query_place_id=ChIJC1DRMQDV1IkRid_GssVkIvY"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-semibold"
                    >
                        View all reviews on Google →
                    </a>
                </div>
            </div>
        </section>
    );
};

export default GoogleReviews;
