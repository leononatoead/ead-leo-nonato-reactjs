import logo from '../../assets/auth-logo.svg';

export default function AuthHeader({ step }) {
  return (
    <>
      <div className='w-full flex justify-center pt-4 pb-8'>
        <img src={logo} alt='logo' />
      </div>

      <div className='flex justify-center gap-2 w-full p-4'>
        <span className='h-1 bg-[#005FB8] w-1/4' />
        <span
          className={`h-1 ${step >= 2 ? 'bg-[#005FB8]' : ' bg-white'}  w-1/4`}
        />
        <span
          className={`h-1 ${step >= 3 ? ' bg-[#005FB8]' : ' bg-white'}  w-1/4`}
        />
        <span
          className={`h-1 ${step >= 4 ? ' bg-[#005FB8]' : ' bg-white'}  w-1/4`}
        />
      </div>
    </>
  );
}
