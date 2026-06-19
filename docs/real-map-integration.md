# Real Map Integration Notes

This branch prepares the current static map screen for a real map provider.
The app still renders the existing image map, but place data now uses real map
fields so Kakao Map, Naver Map, or Google Maps can be added with less churn.

## Current Preparation

- `Place.coordinates` stores `{ lat, lng }`.
- `Place.address` replaces hardcoded detail-page address text.
- `Place.externalPlaceId` is reserved for provider IDs such as Kakao place IDs.
- `/map` projects coordinates onto the current static image through
  `projectGeoPointToStaticMap`.
- `/map` wraps `useSearchParams` in `Suspense`, matching the Next.js App Router
  production-build requirement.

## Recommended Provider

For this Korean study-spot product, Kakao Map is the best first provider:

- Strong local place search.
- JavaScript SDK supports custom overlays for the existing pin design.
- Place search returns provider IDs that can be stored in `externalPlaceId`.

## Environment Variable

Add this locally when the real provider is introduced:

```bash
NEXT_PUBLIC_KAKAO_MAP_APP_KEY=your_javascript_key
```

The `NEXT_PUBLIC_` prefix is required because the map SDK runs in the browser.
Do not commit `.env` files.

## Implementation Steps

1. Create a map provider component, for example `app/map/KakaoMapView.tsx`.
2. Load the Kakao Maps JavaScript SDK inside the client component.
3. Replace the static image block in `app/map/page.tsx` with the provider
   component.
4. Pass `filteredPlaces`, `selectedPlace`, and `setSelectedPlace` into the
   provider component.
5. Convert each `Place.coordinates` to `new kakao.maps.LatLng(lat, lng)`.
6. Render pins with `kakao.maps.CustomOverlay` if the current SVG pin design
   should be preserved.
7. On pin click, keep the existing state behavior:

```ts
setSelectedPlace(place);
setIsFilterOpen(false);
setIsSnapping(true);
setSheetTop(SHEET_DEFAULT);
```

8. Replace `MOCK_USER_LOCATION` with `navigator.geolocation.getCurrentPosition`.
9. Connect the search bar to Kakao Places keyword search.
10. Store returned provider IDs in `externalPlaceId`; use an internal `id` for
    app routing and persistence.

## Data Contract

Keep this shape stable when moving from mock data to API data:

```ts
interface Place {
  id: number;
  name: string;
  category: "카페" | "도서관" | "스터디카페";
  address: string;
  coordinates: { lat: number; lng: number };
  externalPlaceId?: string;
}
```

Provider APIs often return longitude before latitude. Kakao Places returns
`x` as longitude and `y` as latitude, so map it as:

```ts
coordinates: {
  lat: Number(result.y),
  lng: Number(result.x),
}
```
