"use client";

import { Locale } from "@/i18n/config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StarsRating from "./StarsRating";
import { formatDistanceToNow } from "date-fns";
import { ru, tr, enUS } from "date-fns/locale";

// author_name: 'Yilmaz Duman',
// author_url: 'https://www.google.com/maps/contrib/117871288978558326959/reviews',
// language: 'en-US',
// original_language: 'tr',
// profile_photo_url: 'https://lh3.googleusercontent.com/a/ACg8ocJ9DQVrhO0yn516x7ZHaG1S1-li3YzgIXud4aaeKpSZuDG9iA=s128-c0x00000000-cc-rp-mo',
// rating: 5,
// relative_time_description: '3 years ago',
// text: 'I am very pleased with the spraying I had done. They really do this job professionally, thank you.',
// time: 1620415842,
// translated: true

export default function GoogleReviews({
  placeInfo,
  locale,
}: {
  placeInfo: IPlaceInfo | undefined;
  locale: Locale;
}) {
  if (!placeInfo) return;
  return (
    <div className="my-4 w-screen max-w-(--breakpoint-xl) overflow-scroll">
      <div className="flex w-[100em]">
        {placeInfo.reviews.map((review) => (
          <GoogleReviewCard
            key={review.author_name.concat(review.time.toString())}
            {...review}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
}

const GoogleReviewCard = ({
  author_name,
  // author_url,
  // language,
  // original_language,
  // profile_photo_url,
  // relative_time_description,
  // translated,
  rating,
  text,
  time,
  locale,
}: IGoogleReview & { locale: Locale }) => {
  return (
    <Card className="mx-4 flex w-full flex-1 flex-col">
      <CardHeader>
        <CardTitle className="flex h-8 justify-between">
          <div>{author_name}</div>
          <img src="/GLogo.png" alt="Google logo" className="w-8" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <StarsRating rating={rating} />
        <div className="max-h-40 flex-1 overflow-scroll">{text}</div>
        <div className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(time * 1000), {
            locale: locale === "ru" ? ru : locale === "tr" ? tr : enUS,
          })}
        </div>
      </CardContent>
    </Card>
  );
};
