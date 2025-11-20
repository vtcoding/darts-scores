import { useQuery } from "@tanstack/react-query";

import { fetchWithAuth } from "../utils/fetchWithAuth";
import type { Match } from "./types";

const API_URL = "http://localhost:8000/api"; // adjust if needed

export const registerUser = async (username: string, password: string) => {
  const res = await fetch(`${API_URL}/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
};

export const loginUser = async (username: string, password: string) => {
  const res = await fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

const fetchMatches = async (): Promise<Match[]> => {
  const res = await fetchWithAuth("/matches/");
  if (!res.ok) throw new Error("Failed to fetch matches");
  const data: Match[] = await res.json();
  return data;
};

export const useMatches = () => {
  return useQuery<Match[], Error>({
    queryKey: ["matches"],
    queryFn: fetchMatches,
  });
};
