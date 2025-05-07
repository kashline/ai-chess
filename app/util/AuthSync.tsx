"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@/app/store/userSlice";
import type { AppDispatch } from "@/app/store/store";

const AuthSync = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/data?email=${session?.user?.email}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        dispatch(setUser(data));
      } catch (err) {
        console.error("AuthSync error:", err);
        dispatch(clearUser());
      }
    };
    if (status === "authenticated" && session?.user) {
      fetchUser();
    } else if (status === "unauthenticated") {
      dispatch(clearUser());
    }
  }, [status, session, dispatch]);

  return null;
};

export default AuthSync;
