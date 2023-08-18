import useAddDocument from '../../hooks/useAddDocument';

export default function AddCourse() {
  const { addDocument } = useAddDocument('courses');

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({ name: 'Trader Elite', author: 'Leo Nonato', isFree: true });
  };

  return (
    <form
      className='flex flex-col mx-auto w-[90%] p-4 gap-4'
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        className='rounded-md border-[1px] border-zinc-300 bg-zinc-200 p-2'
      />
      <input
        type='text'
        className='rounded-md border-[1px] border-zinc-300 bg-zinc-200 p-2'
      />
      <input
        type='text'
        className='rounded-md border-[1px] border-zinc-300 bg-zinc-200 p-2'
      />
      <button
        type='submit'
        className='p-2 bg-sky-500 rounded-md text-white font-bold'
      >
        Cadastrar
      </button>
    </form>
  );
}
