import { Session } from 'next-auth';

export const postComment = async (
  bookId: string,
  userId: string,
  text: string
) => {
  try {
    const response = await fetch(
      `/api/comment?bookId=${bookId}&userId=${userId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, book_id: bookId, text }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to add comment');
    }
    const data = await response.json();
    return data.comment;
  } catch (error) {
    console.log('Failed to add comment', error);
  }
};

export const getAllComments = async (bookId: string) => {
  try {
    const response = await fetch(`/api/comment?bookId=${bookId}`);
    if (!response.ok) {
      throw new Error('Error fetching comments');
    }
    const data = await response.json();
    return data.comments;
  } catch (error) {
    console.error('Error fetching comments', error);
  }
};

export const deleteComment = async (
  commentId: string,
  bookId: string,
  session: Session | null
) => {
  try {
    const userId = session?.user?.id;
    const response = await fetch(
      `/api/comment?bookId=${bookId}&commentId=${commentId}&userId=${userId}`,
      {
        method: 'DELETE',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to delete comment');
    }
  } catch (error) {
    console.error('Failed to delete comment', error);
  }
};
