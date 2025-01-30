interface IGoogleReview {
  author_name: string;
  author_url: string;
  language: string;
  original_language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  translated: true;
}

interface IPlaceInfo {
  name: string;
  rating: number;
  url: string;
  user_ratings_total: number;
  reviews: IGoogleReview[];
}
