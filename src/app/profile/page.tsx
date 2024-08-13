'use client';
import { useState, useEffect, useRef } from 'react';
import { UserDocument } from '@/models/User';
import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react';
import { cloudinary } from '@/config/cloudinary';
import { User } from '@/types/types';
const { CLOUDINARY_CLOUD_NAME } = process.env;

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (session) {
      fetchUser();
    }
  }, [userId]);

  async function fetchUser() {
    try {
      const res = await fetch(`/api/profile?userId=${userId}`, {
        method: 'GET',
      });
      const data = await res.json();
      console.log(data);
      setUser(data.user);
      setFormData(data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (formData) {
      setFormData((prevData: any) => ({
        ...prevData,
        [name]: value,
      }));
      console.log(formData);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        setFormData((prevData: any) => ({
          ...prevData,
          avatar: result,
        }));
        console.log(result);
      };
    }
  };

  const handleSaveUpdates = async () => {
    try {
      const res = await fetch(`/api/profile?userId=${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setUser(data);
      setIsEditing(false);
      fetchUser();
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleClickFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className='bg-white min-h-screen h-auto flex flex-col justify-between'>
      <Navbar />
      <div className='container mx-auto p-6'>
        <div className='mt-8 space-y-4'>
          <div className='flex flex-col items-center'>
            <img
              src={formData?.avatar}
              alt='User Avatar'
              className='w-32 h-32 rounded-full border-cyan-400'
            />
            <button
              className='mt-2 px-4 py-2 bg-green-500 text-white rounded-md'
              onClick={handleClickFileInput}>
              Change Avatar
            </button>
            <input
              type='file'
              accept='image/*'
              onChange={handleAvatarChange}
              className='hidden'
              ref={fileInputRef}
              name='avatar'
            />
            <h1 className='text-2xl font-bold mt-4'>{formData?.username}</h1>
          </div>
          <div>
            <label className='block font-medium text-gray-700'>Email:</label>
            <input
              type='email'
              name='email'
              value={formData?.email}
              //value={user?.email}
              onChange={handleChange}
              disabled={!isEditing}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300'
            />
          </div>
          <div>
            <label className='block font-medium text-gray-700'>Username:</label>
            <input
              type='text'
              name='username'
              // value={user?.username}
              value={formData?.username}
              onChange={handleChange}
              disabled={!isEditing}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300'
            />
          </div>
          <div>
            <label className='block font-medium text-gray-700'>Name:</label>
            <input
              type='text'
              name='name'
              value={formData?.name}
              // value={user?.name}
              onChange={handleChange}
              disabled={!isEditing}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300'
            />
          </div>
          <div>
            <label className='block font-medium text-gray-700'>Surname:</label>
            <input
              type='text'
              name='surname'
              value={formData?.surname}
              //value={user?.surname}
              onChange={handleChange}
              disabled={!isEditing}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300'
            />
          </div>
          <div>
            <label className='block font-medium text-gray-700'>Country:</label>
            <input
              type='text'
              name='country'
              value={formData?.country}
              //value={user?.country}
              onChange={handleChange}
              disabled={!isEditing}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300'
            />
          </div>
          <div>
            <label className='block font-medium text-gray-700'>City:</label>
            <input
              type='text'
              name='city'
              value={formData?.city}
              //value={user?.city}
              onChange={handleChange}
              disabled={!isEditing}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300'
            />
          </div>
          <div>
            <label className='block font-medium text-gray-700'>Postcode:</label>
            <input
              type='number'
              name='postcode'
              value={formData?.postcode}
              //value={user?.postcode}
              onChange={handleChange}
              disabled={!isEditing}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300'
            />
          </div>
        </div>
      </div>

      <div className='container mx-auto p-6'>
        <div className='text-center mt-6'>
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded-md'
            onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
          {isEditing && (
            <button
              onClick={handleSaveUpdates}
              className='ml-4 px-4 py-2 bg-green-500 text-white rounded-md'>
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
