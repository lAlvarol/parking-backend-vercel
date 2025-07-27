// api/proxy.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { lat, lng } = req.query;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!lat || !lng) {
    return res.status(400).json({ error: "Parámetros 'lat' y 'lng' requeridos." });
  }

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&type=parking&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error al consultar Google Places:", err);
    res.status(500).json({ error: "Error al consultar Google Places" });
  }
}
