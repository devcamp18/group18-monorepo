import Image from 'next/image';
import icon from '../../public/tshirt.png';

type Props = {
  sizes: string[];
};

const MeasuredSizeCard = ({ sizes }: Props) => {
  const print = () => {
    return sizes.map((s) => s).join(', ');
  };

  return (
    <div style={{ color: '#F9F9F9' }} className='border border-gray-200 rounded-md px-2 py-4'>
      <div className='flex'>
        <div>
          <div className='w-12 h-12 flex items-center justify-center rounded-md border bg-gray-100'>
            <Image src={icon} alt='' />
          </div>
        </div>

        <div className='text-black ml-3'>
          <h3 className='font-semibold'>Rekomendasi</h3>
          {sizes.length > 0 ? (
            <p className='text-sm'>
              Rekomendasi ukuran produk ini untukmu adalah ukuran <strong>{print()}</strong>
            </p>
          ) : (
            <p className='text-sm'>Mohon maaf, sepertinya tidak ada ukuran yang cocok untukmu</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeasuredSizeCard;
