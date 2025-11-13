"use client";

import { useContext, useEffect, useState } from "react";
import Image from 'next/image'
import axios from "axios";
import Modal from "../modal/modal";
import EditProfile from "../editProfile/editProfile";

interface ProfileData {
  fullname: string;
  username: string;
  avatar: string | null;
}

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);


  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<ProfileData>(
          `https://titusukpono.pythonanywhere.com/user/me`,
        );

        setProfile(response.data);
      } catch (err) {
        console.error("Error loading profile:", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-3 animate-pulse">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <div className="flex items-center gap-3 truncate">
        <Image
          src={profile?.avatar || "/default-avatar.png"}
          alt={`${profile?.fullname }'s profile`}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover border border-gray-300 max-md:w-8 max-md:h-8 cursor-pointer"
          onClick={() => setIsEdit(true)}
        />

        <div className="min-w-0 ">
          <p className="font-semibold truncate max-md:text-xs">
            {profile?.fullname}
          </p>
          <p className="text-gray-500 text-sm truncate">
            @{profile?.username }
          </p>
        </div>
      </div>

      <Modal isOpen={isEdit} onClose={() => setIsEdit(false)}>
        <EditProfile  onClose={() => setIsEdit(false)} />
      </Modal>
    </>
  );
};

export default UserProfile;
