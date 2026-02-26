import React, { useState } from 'react';
import { ButterModal } from '../src';
import { createRoot } from 'react-dom/client';

function Demo() {
  const [open, setOpen] = useState(false);

  const states = [
    {
      key: 'default',
      content: (
        <div>
          <h2>Welcome</h2>
          <p>This is the default state of the modal.</p>
        </div>
      ),
    },
    {
      key: 'passkey',
      content: (
        <div>
          <h2>Set up Passkey</h2>
          <p>This is the passkey state of the modal.</p>
          <p>This is the default state of the modal.</p>
          <p>This is the default state of the modal.</p>
          <p>This is the default state of the modal.</p>
          <p>This is the default state of the modal.</p>
          <p>This is the default state of the modal.</p>
          <p>This is the default state of the modal.</p>
        </div>
      ),
    },
    {
      key: 'success',
      content: (
        <div>
          <h2>Success!</h2>
          <p>You have successfully set up your passkey.</p>
          <p>This is the default state of the modal.</p>
          <p>This is the default state of the modal.</p>
          <p>This is the default state of the modal.</p>
        </div>
      ),
    },
  ];

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>

      <ButterModal
        states={states}
        initialStep="default"
        open={open}
        onOpenChange={setOpen}
        trigger={<button>Trigger (alternative)</button>}
        theme={{
          background: '#ffffff',
          border: '#e0e0e0',
          text: '#111111',
          overlay: '#000000',
        }}
        contentStyle={{
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        }}
        containerStyle={{
          padding: '8px',
        }}
      >
        {({ step, setStep, close }) => (
          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            {step !== 'default' && (
              <button onClick={() => setStep('default')}>Back</button>
            )}
            {step === 'default' && (
              <button onClick={() => setStep('passkey')}>Next</button>
            )}
            {step === 'passkey' && (
              <button onClick={() => setStep('success')}>Confirm</button>
            )}
            {step === 'success' && <button onClick={close}>Done</button>}
          </div>
        )}
      </ButterModal>
    </>
  );
}

createRoot(document.getElementById('root')!).render(<Demo />);
