import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { fetchWithAuth } from "../utils/fetchWithAuth";
import type { Match, PracticeMatch, Stats } from "./types";

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

const uploadMatch = async (match: Match[]): Promise<Match[]> => {
  const res = await fetchWithAuth("/matches/upload/", {
    method: "POST",
    body: JSON.stringify(match),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Failed to upload matches");

  return res.json();
};

export const useUploadMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadMatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
  });
};

const fetchPracticeMatches = async (): Promise<PracticeMatch[]> => {
  const res = await fetchWithAuth("/practice-matches/");
  if (!res.ok) throw new Error("Failed to fetch practice matches");
  const data: PracticeMatch[] = await res.json();
  return data;
};

export const usePracticeMatches = () => {
  return useQuery<PracticeMatch[], Error>({
    queryKey: ["practice-matches"],
    queryFn: fetchPracticeMatches,
  });
};

const uploadPracticeMatch = async (match: PracticeMatch): Promise<PracticeMatch> => {
  const res = await fetchWithAuth("/practice-matches/upload/", {
    method: "POST",
    body: JSON.stringify(match),
  });

  if (!res.ok) throw new Error("Failed to upload match");

  return res.json();
};

export const useUploadPracticeMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadPracticeMatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["practice-matches"] });
    },
  });
};

const uploadStats = async (stats: Stats): Promise<Stats> => {
  const res = await fetchWithAuth("/stats/upload/", {
    method: "POST",
    body: JSON.stringify(stats),
  });

  if (!res.ok) throw new Error("Failed to upload stats");

  return res.json();
};

export const useUploadStats = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadStats,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches", "practice-matches"] });
    },
  });
}

const deleteStats = async () => {
  const res = await fetchWithAuth("/stats/delete/", {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete stats");

  return null;
};

export const useDeleteStats = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStats,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches", "practice-matches"] });
    },
  });
};