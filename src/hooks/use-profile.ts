"use client"

import { useEffect, useState } from "react";
import { Identity } from "@dfinity/agent";

type UseProfileProps = {
  identity?: Identity;
};

export function useProfile(props: UseProfileProps) {
  const { identity } = props;
  const [profile, setProfile] = useState<ProfileUpdate>();

  const updateProfile = (profile: ProfileUpdate | undefined) => {
    if (profile) {
      set("profile", JSON.stringify(profile));
    } else remove("profile");
    setProfile(profile);
  };

  useEffect(() => {
    const stored = JSON.parse(get("profile")) as ProfileUpdate | undefined;
    if (stored) {
      setProfile(stored);
    }
  }, []);

  if (!identity) return { profile: emptyProfile, updateProfile };

  return { profile, updateProfile };
}