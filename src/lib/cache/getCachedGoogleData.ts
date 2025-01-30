import { Locale } from "@/i18n/config";
import unstableCache from "./unstableCache";

export default async function getCachedGoogleData({
  placeId,
  key,
  language,
}: {
  placeId: string;
  key: string;
  language: Locale;
}) {
  // getting cached google map data
  return unstableCache(
    async () => {
      console.log("Fetching google data");

      const googleData = (await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Crating%2Creviews%2Cuser_ratings_total%2Curl&language=${language}&place_id=${placeId}&key=${key}`,
      ).then((response) => response.json())) as {
        status: string;
        result: IPlaceInfo;
      };

      return googleData;
    },
    [`GoogleData${language}${placeId}`],
    { revalidate: 60 * 60 * 24, tags: [`GoogleDataTag${language}${placeId}`] },
  );
}
