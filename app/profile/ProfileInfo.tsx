"use client";

import { useAppSelector } from "@/app/store/hooks";
import Button from "@/app/ui/Button";
import EditIcon from "@/app/ui/icons/EditIcon";
import { useSession } from "next-auth/react";
import Image from "next/image";
import * as React from "react";

export default function ProfileInfo() {
  const { user } = useAppSelector((state) => state.user);
  const [editUsername, setEditUsername] = React.useState(false);
  const editUsernameRef = React.useRef<HTMLInputElement>(null);
  const [username, setUsername] = React.useState(user?.username);
  const { update } = useSession();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/username", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
    } else {
      await update(); // Refresh session to include new username
    }

    setLoading(false);
  };
  React.useEffect(() => {
    if (user?.username) {
      setUsername(user.username);
    }
  }, [user?.username]);
  React.useEffect(() => {
    editUsernameRef.current?.focus();

    function handleClickOutside(event: MouseEvent) {
      if (
        editUsernameRef.current &&
        !editUsernameRef.current.contains(event.target as Node)
      ) {
        setEditUsername(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  if (!user) return <p>Loading...</p>;
  return (
    <div className="max-w-md mx-auto p-6">
      <div className="flex gap-6">
        <strong className="text-4xl my-auto">Welcome, {user.username}!</strong>
        <div className="mt-2">
          <Image
            src={user.image}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover border"
            width={50}
            height={50}
          />
        </div>
      </div>
      <div className="border-2 border-gunmetal">
        <div className="mx-2 my-2 space-y-2">
          <div>
            <strong>Name:</strong> {user.name}
          </div>
          <div className="flex">
            <strong>Username:</strong>

            {!editUsername && (
              <div className="flex gap-2">
                <p>{username}</p>
                <button
                  className="my-auto"
                  onClick={() => setEditUsername(!editUsername)}
                >
                  <EditIcon width={20} height={20} />
                </button>
              </div>
            )}
            {editUsername && (
              <input
                ref={editUsernameRef}
                value={username}
                type="text"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            )}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Verified:</strong> {user.emailVerified ? "Yes" : "No"}
          </div>
          <div>
            <strong>Joined:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </div>
          <div>
            <strong>Updated:</strong>{" "}
            {new Date(user.updatedAt).toLocaleDateString()}
          </div>
          <div></div>
        </div>
      </div>
      {username !== user.username && (
        <div>
          <div className="flex">
            <Button className={`mx-auto my-2`} onClick={handleSubmit}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
          <div className="flex">
            {error && <p className="text-red-600 text-sm mx-auto">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
