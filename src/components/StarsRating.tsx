import { Star, StarHalf } from '@phosphor-icons/react';

interface Props {
  rating: number;
}
const StarsRating = ({ rating }: Props) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const totalStars = 5;

  return (
    <div className='flex items-center'>
      {Array.from({ length: fullStars }).map((_, index) => (
        <Star key={index} size={16} className='text-yellow-500' weight='fill' />
      ))}
      {hasHalfStar && <StarHalf size={16} className='text-yellow-500' />}
      {Array.from({
        length: totalStars - fullStars - (hasHalfStar ? 1 : 0),
      }).map((_, index) => (
        <Star
          key={index + fullStars + (hasHalfStar ? 1 : 0)}
          size={16}
          className='text-gray-300'
          weight='regular'
        />
      ))}
    </div>
  );
};
export default StarsRating;
