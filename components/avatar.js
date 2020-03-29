import { getImageUrl } from 'takeshape-routing';

export default function Avatar({ name, picture }) {
  name = name?.blocks[0]?.text || '';
  picture = picture?.path || '';

  return (
    <div className="flex items-center">
      <img
        src={getImageUrl(picture, {
          fm: 'jpg',
          fit: 'crop',
          w: 100,
          h: 100,
          sat: -100,
        })}
        className="w-12 h-12 rounded-full mr-4"
        alt={name}
      />
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}
