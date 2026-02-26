import { createRoot } from 'react-dom/client';
import { ButterModal } from '../src';

function Demo() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ButterModal />
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<Demo />);
