import { env } from "./lib/env.mjs";

// namings
export const brandName = "Tattoo Salon";
export const brandAddress = [
  "Tahılpazarı, Kazım Özalp Cd. No:84 ",
  "07040 Muratpaşa/Antalya ",
  "Türkiye",
];
export const brandEmail = "roman.s@warlockja.com";
export const brandPhone = { number: "+905310889141", string: "531 088 9141" };
export const brandWhatsApp = {
  number: "+905310889141",
  string: "+90 531 088 9141",
};
export const brandWorkHours = "6:00 - 21:00";

export const brandNoReplyEmail = "no-reply@warlockja.com";
export const brandCoordinates = {
  lat: 36.89299844632891,
  lng: 30.704392963690587,
};
export const brandMapDirectionsLink =
  "https://www.google.com/maps/dir//MarkAntalya+Mall,+Tah%C4%B1lpazar%C4%B1,+Kaz%C4%B1m+%C3%96zalp+Cd.+No:84,+07040+Muratpa%C5%9Fa%2FAntalya,+T%C3%BCrkiye/@36.892427,30.7038826,16.75z/data=!3m1!5s0x14c38ffd878d7f5d:0x8c80459e1cba5f38!4m17!1m7!3m6!1s0x14c38ffd76d81ddd:0x69d5ac1f1b619739!2sMarkAntalya+Mall!8m2!3d36.8927982!4d30.7043363!16s%2Fg%2F1ptw49rb5!4m8!1m0!1m5!1m1!1s0x14c38ffd76d81ddd:0x69d5ac1f1b619739!2m2!1d30.7043363!2d36.8927982!3e2?entry=ttu&g_ep=EgoyMDI1MDEyNy4wIKXMDSoASAFQAw%3D%3D";
export const brandPlaceId = "ChIJ3R3Ydv2PwxQROZdhGx-s1Wk";
export const brandX = "#";
export const brandFB = "#";
export const brandYT = "#";
export const brandIG = "#";
// privacy policy
export const brandChildrenPrivacyAge = 18;

// default blurhash
export const defaultBlurhash =
  "WRDS%Y%NOaIVWBogt:o#bJRjaeog5XM{jExaocof-6RjM{t7t6j[";

// constants
// max file size allowed to be uploaded
export const MAX_FILE_SIZE = 5000000; // 5MB
export const USER_STORAGE_LIMIT = 100000000; // 100MB
export const defaultImageName = "default.webp";
export const defaultImageWidth = 1408;
export const defaultImageHeight = 768;
export const blogsLimit = 4;

// metadata
export const brandMetadataDescritpion =
  "Explore a world of creativity and self-expression at Tattoo Salon. Discover stunning tattoo designs, expert artist portfolios, and inspiration for your next ink. Whether you're looking for custom tattoos, aftercare tips, or the latest trends, we've got you covered. Find trusted tattoo studios near you and connect with skilled artists to bring your vision to life. Your journey to the perfect tattoo starts here!";
export const brandMetadataUrl = env.NEXT_PUBLIC_URI;
export const brandMetadataSiteName = "Tattoo Salon";
export const brandMetadataCanonical = env.NEXT_PUBLIC_URI;
export const brandMetadataImage = {
  url: `${env.NEXT_PUBLIC_R2_URI}/logo.png`,
  width: 660,
  height: 660,
  alt: "Tattoo Salon",
  type: "image/png",
};
export const brandMetadataTwitterAccount = "@RomanStepa49093";
export const defaultMetadata = {
  title: brandName,
  description: brandMetadataDescritpion,
  openGraph: {
    title: brandName,
    description: brandMetadataDescritpion,
    url: brandMetadataUrl,
    siteName: brandMetadataSiteName,
    images: [brandMetadataImage],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: brandMetadataTwitterAccount,
    creator: brandMetadataTwitterAccount,
  },
};

// metadata services
export const brandMetadataServices =
  "Explore a world of creativity and self-expression at Tattoo Salon. Discover stunning tattoo designs, expert artist portfolios, and inspiration for your next ink. Whether you're looking for custom tattoos, aftercare tips, or the latest trends, we've got you covered. Find trusted tattoo studios near you and connect with skilled artists to bring your vision to life. Your journey to the perfect tattoo starts here!";

// email constants
export const brandEmailBackgroundColor = "#fafafa";
export const brandEmailColor = "#020817";
export const brandEmailTextColor = "#1c1917";
export const brandEmailMutedTextColor = "#535353";
export const brandEmailButtonTextColor = "#fafaf9";
export const brandEmailLogoUrl = `${env.NEXT_PUBLIC_R2_URI}/logo.png`;
