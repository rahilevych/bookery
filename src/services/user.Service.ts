import { User } from '@/types/types';

export const getUser = async (userId: string) => {
  try {
    const res = await fetch(`/api/profile?userId=${userId}`, {
      method: 'GET',
    });
    const data = await res.json();
    return data.user;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

export const updateProfile = async (userId: string, formData: User) => {
  try {
    const res = await fetch(`/api/profile?userId=${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};
