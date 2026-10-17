export default async (req, context) => {
  const PLACE_ID = "ChIJ-wu9DTBgNw0RzLNzb_-yD-g";
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  try {
    const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=reviews,rating,userRatingCount&key=${API_KEY}&languageCode=es`;
    const res = await fetch(url);
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

export const config = { path: "/api/reviews" };
