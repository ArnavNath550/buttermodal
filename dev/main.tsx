import React, { useState } from 'react';
import { ButterModal } from '../src';
import { createRoot } from 'react-dom/client';

function Demo() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState('default');

  const states = [
    {
      key: 'default',
      content: (
        <div>
          <h2>Welcome</h2>
          <p>This is the default state of the modal.</p>
          <p>This is the default state of the modal.</p>
          <p>This is the default state of the modal.</p>
          <p>This is the default state of the modal.</p>
          <p>This is the default state of the modal.</p>
          <p>This is the default state of the modal.</p>

          <button onClick={() => setStep('passkey')}>Passkey</button>
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
          <button onClick={() => setStep('success')}>Success</button>
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
          <button onClick={() => setStep('default')}>Back</button>
        </div>
      ),
    },
  ];

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>

      <ButterModal
        states={states}
        step={step}
        onStepChange={setStep}
        initialStep="default"
        open={open}
        onOpenChange={setOpen}
        trigger={<button>Trigger (alternative)</button>}
        theme={{
          background: '#ffffff',
          border: 'transparent',
          text: '#111111',
          overlay: '#000000',
        }}
        containerStyle={{
          padding: 12,
        }}
        contentStyle={{
          borderRadius: 20,
        }}
      >
        {/*{({ step, setStep, close }) => (
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
        )}*/}
      </ButterModal>
    </>
  );
}

createRoot(document.getElementById('root')!).render(<Demo />);
