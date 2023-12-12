import {useRouter} from 'next/router';

function BackButton() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div>
      <button
        style={{
          fontSize: '36pt',
          color: 'black',
          backgroundColor: 'transparent',
        }}
        onClick={goBack}
      >
        ←
      </button>
    </div>
  );
}
export default BackButton;
