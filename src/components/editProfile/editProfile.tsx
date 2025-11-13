"use client";
import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { EditProfileProps } from "../interface/EditProfileProps";
import { UserProfileResponse } from "../interface/UserProfileResponse";
import { ProfileForm } from "../interface/ProfileForm";

const EditProfile: React.FC<EditProfileProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<ProfileForm>({
    fullname: "",
    username: "",
    avatar: null
  });

  const { fullname, username, avatar } = formData;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get<UserProfileResponse>(
          "https://titusukpono.pythonanywhere.com/user/me"
        );

        setFormData(prev => ({
          ...prev,
          fullname: res.data.fullname || "",
          username: res.data.username || "",
        }));

      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileUpdate = async (e: FormEvent) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append("fullname", fullname);
    submitData.append("username", username);
    if (avatar) submitData.append("avatar", avatar);

    try {
      await axios.patch("https://titusukpono.pythonanywhere.com/user/me", submitData);

      alert("Profile updated successfully");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  if (loading) return <p className="text-center py-6">Loading...</p>;

  return (
    <form onSubmit={handleProfileUpdate} className="space-y-4">
      <h1 className="text-xl font-semibold mb-2">Edit Profile</h1>

      <input
        type="text"
        value={fullname}
        onChange={(e) =>
          setFormData(prev => ({ ...prev, fullname: e.target.value }))
        }
        className="w-full border p-2 rounded"
        placeholder="Full Name"
        required
      />

      <input
        type="text"
        value={username}
        onChange={(e) =>
          setFormData(prev => ({ ...prev, username: e.target.value }))
        }
        className="w-full border p-2 rounded"
        placeholder="Username"
        required
      />

      <input
        placeholder="file"
        type="file"
        accept="image/*"
        className="w-full"
        onChange={(e) =>
          setFormData(prev => ({
            ...prev,
            avatar: e.target.files ? e.target.files[0] : null
          }))
        }
      />

      <button
        type="submit"
        className="w-full bg-[#00A58E] text-white p-2 rounded hover:bg-[#008f7a]"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditProfile;
