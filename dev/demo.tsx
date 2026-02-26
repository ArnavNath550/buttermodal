import { createRoot } from 'react-dom/client';
import { ButterModal } from '../src';

function Demo() {
  return <ButterModal />;
}

createRoot(document.getElementById('root')!).render(<Demo />);
