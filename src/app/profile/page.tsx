'use client';
import { useState, useEffect, useRef } from 'react';

import { useSession } from 'next-auth/react';
import { User } from '@phosphor-icons/react';

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
    <div className='bg-gray-100 min-h-screen flex flex-col'>
      <div className='container mx-auto p-6'>
        <div className='bg-white p-6 rounded-lg shadow-lg'>
          <div className='flex flex-col items-center'>
            <div className='relative'>
              {formData?.avatar ? (
                <img
                  src={formData?.avatar}
                  className='w-32 h-32 rounded-full border-4 border-purple-500 object-cover'
                />
              ) : (
                <User
                  size={32}
                  className='w-32 h-32 rounded-full border-4 border-purple-500 object-cover'
                />
              )}

              {isEditing && (
                <button
                  className='absolute bottom-0 right-0 bg-purple-600 text-white rounded-full p-2 shadow-md border border-white'
                  onClick={handleClickFileInput}>
                  <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M7 7l10 10M17 7l-10 10'></path>
                  </svg>
                </button>
              )}
              <input
                type='file'
                accept='image/*'
                onChange={handleAvatarChange}
                className='hidden'
                ref={fileInputRef}
                name='avatar'
              />
            </div>
            <h1 className='text-2xl font-semibold mt-4 text-gray-800'>
              {formData?.username}
            </h1>
          </div>
          <div className='mt-6 space-y-4'>
            {[
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'Username', name: 'username', type: 'text' },
              { label: 'Name', name: 'name', type: 'text' },
              { label: 'Surname', name: 'surname', type: 'text' },
              { label: 'Country', name: 'country', type: 'text' },
              { label: 'City', name: 'city', type: 'text' },
              { label: 'Postcode', name: 'postcode', type: 'number' },
            ].map((field) => (
              <div key={field.name}>
                <label className='block text-sm font-medium text-gray-700'>
                  {field.label}:
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData?.[field.name] || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className='mt-1 block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500'
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='bg-white py-4 shadow-md'>
        <div className='container mx-auto flex justify-center gap-4'>
          <button
            className={`px-4 py-2 rounded-md font-semibold text-white transition-colors ${
              isEditing
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
            onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
          {isEditing && (
            <button
              onClick={handleSaveUpdates}
              className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors'>
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
