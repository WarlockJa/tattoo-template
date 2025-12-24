"use client";
import {
  Map,
  APIProvider,
  AdvancedMarker,
  Pin,
  ColorScheme,
} from "@vis.gl/react-google-maps";
import React, { ReactNode } from "react";
import { env } from "@/lib/env.mjs";
import { brandMapDirectionsLink, brandPlaceId } from "@/appConfig";
import StarsRating from "./StarsRating";
import Link from "next/link";
import { Globe, Split } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

function GoogleMaps({
  coordinates = { lat: 36.91606689329274, lng: 30.803398216126208 },
  placeInfo,
  pinchild,
  className,
}: {
  coordinates?: { lng: number; lat: number };
  placeInfo: IPlaceInfo | undefined;
  pinchild: ReactNode;
  className?: string;
}) {
  const theme = useTheme();
  return (
    <APIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div className={className}>
        <Map
          defaultCenter={coordinates}
          mapId={env.NEXT_PUBLIC_GOOGLE_MAP_ID}
          fullscreenControl={false}
          streetViewControl={false}
          defaultZoom={17}
          minZoom={13}
          mapTypeControl={false}
          colorScheme={theme.resolvedTheme?.toUpperCase() as ColorScheme}
          reuseMaps
        >
          <AdvancedMarker position={coordinates}>
            <Pin
              background={"#ffffff"}
              borderColor={"#232323"}
              // glyphColor={"#0f677a"}
              scale={1.2}
            >
              {pinchild}
            </Pin>
          </AdvancedMarker>
        </Map>
        {placeInfo && <ControlPanel placeInfo={placeInfo} />}
      </div>
    </APIProvider>
  );
}

export default React.memo(GoogleMaps);

function ControlPanel({ placeInfo }: { placeInfo: IPlaceInfo }) {
  const tGoogleMaps = useTranslations("GoogleMaps");
  return (
    <div className="bg-background absolute bottom-0 flex flex-col flex-wrap rounded-none border px-2 py-1 font-sans text-[0.8rem] shadow-xs sm:top-0 sm:bottom-auto sm:left-0">
      <h1>{placeInfo.name}</h1>
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-1">
          <div>{placeInfo.rating.toFixed(1)}</div>
          <StarsRating rating={placeInfo.rating} size={1} />
          <Link
            href={`https://search.google.com/local/reviews?placeid=${brandPlaceId}&gl=PH`}
            target="_blank"
            className="flex-1 text-nowrap underline"
          >
            {placeInfo.user_ratings_total} {tGoogleMaps("reviews")}
          </Link>
        </div>
        <Link
          href={placeInfo.url}
          target="_blank"
          className="flex items-center underline"
        >
          <Globe size={16} /> &nbsp;{tGoogleMaps("large_view")}
        </Link>
        <Link
          href={brandMapDirectionsLink}
          target="_blank"
          className="flex items-center underline"
        >
          <Split size={16} /> {tGoogleMaps("directions")}
        </Link>
      </div>
    </div>
  );
}
