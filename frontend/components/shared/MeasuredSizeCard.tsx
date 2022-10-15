type Props = {
  size: string;
};

const MeasuredSizeCard = ({ size }: Props) => {
  return (
    <div style={{ color: '#F9F9F9' }} className='border border-gray-200 rounded-md px-2 py-4'>
      <div className='flex'>
        <div>
          <div className='w-12 h-12 rounded-md border bg-gray-100'>
            {/* <i className='fa-light fa-shirt text-black'></i> */}
          </div>
        </div>

        <div className='text-black ml-3'>
          <h3 className='font-semibold'>Rekomendasi</h3>
          <p className='text-sm'>
            Rekomendasi ukuran produk ini untukmu adalah ukuran <strong>{size}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MeasuredSizeCard;
