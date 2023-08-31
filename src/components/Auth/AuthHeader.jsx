import logo from '../../assets/auth-logo-black.svg';

export default function AuthHeader({ step }) {
  return (
    <div className='auth-header-bg rounded-b-2xl overflow-hidden'>
      <div className='w-full flex justify-center pt-12 pb-8 '>
        <img src={logo} alt='logo' />
      </div>

      <div className='flex justify-center gap-2 w-full p-4'>
        <span className='h-1 bg-primary-400 w-1/4' />
        <span
          className={`h-1 ${
            step >= 2 ? 'bg-primary-400' : ' bg-gray-900'
          }  w-1/4`}
        />
        <span
          className={`h-1 ${
            step >= 3 ? ' bg-primary-400' : ' bg-gray-900'
          }  w-1/4`}
        />
        <span
          className={`h-1 ${
            step >= 4 ? ' bg-primary-400' : ' bg-gray-900'
          }  w-1/4`}
        />
      </div>
    </div>
  );
}
