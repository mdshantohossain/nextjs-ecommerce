"use client";

import { addcurrentLocation } from "@/features/currentLocationSlice";
import { useAppDispatch } from "@/features/hooks";
import { useEffect, useState } from "react";

type Address = {
  address: string;
  city: string;
  state: string;
  country: string;
};

export default function useCurrentLocation() {
  const [location, setLocation] = useState<{
    lat: number | null;
    lon: number | null;
  }>({
    lat: null,
    lon: null,
  });

  const [address, setAddress] = useState<Address>({
    address: "",
    city: "",
    state: "",
    country: "",
  });

  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  // 1️⃣ Try browser geolocation
  useEffect(() => {
    if (!navigator.geolocation) {
      fetchFallbackCountry();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      () => {
        // ❌ User blocked → fallback
        fetchFallbackCountry();
      }
    );
  }, []);

  // 2️⃣ Fetch address using lat/lon
  useEffect(() => {
    const fetchReverseGeo = async () => {
      if (!location.lat || !location.lon) return;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lon}`
        );
        const data = await res.json();

        const addr = data.address || {};

        setAddress({
          address: data.display_name || "",
          city: addr.city || addr.town || "",
          state: addr.state || "",
          country: addr.country || "",
        });
        dispatch(
          addcurrentLocation({
            address: data.country || "",
            city: data.city || "",
            state: "",
            country: data.country || "",
          })
        );
      } catch {
      } finally {
        setLoading(false);
      }
    };

    fetchReverseGeo();
  }, [location]);

  // 3️⃣ Fallback: Country by IP through Next.js API (NO CORS)
  const fetchFallbackCountry = async () => {
    try {
      const res = await fetch("/api/ip-location");
      const data = await res.json();

      setAddress((prev) => ({
        ...prev,
        country: data.country || "",
        city: data.city || "",
      }));

      dispatch(
        addcurrentLocation({
          address: data.country || "",
          city: data.city || "",
          state: "",
          country: data.country || "",
        })
      );
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return { address };
}
