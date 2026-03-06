import React from 'react';
import copy from 'copy-to-clipboard';
import { Highlight } from 'prism-react-renderer';
import styled from 'styled-components';

const theme = {
  plain: {
    color: '#d4d4d4',
    fontSize: 12,
    fontFamily: 'Menlo, monospace',
  },
  styles: [
    {
      types: ['keyword', 'atrule'],
      style: { color: '#ff7b72' },
    },
    {
      types: ['function'],
      style: { color: '#d2a8ff' },
    },
    {
      types: ['string', 'attr-value'],
      style: { color: '#a5d6ff' },
    },
    {
      types: ['class-name', 'maybe-class-name'],
      style: { color: '#ffa657' },
    },
    {
      types: ['tag', 'operator', 'punctuation'],
      style: { color: '#79c0ff' },
    },
    {
      types: ['comment'],
      style: { color: '#8b949e' },
    },
    {
      types: ['attr-name'],
      style: { color: '#7ee787' },
    },
    {
      types: ['number'],
      style: { color: '#79c0ff' },
    },
  ],
};

const Pre = styled.pre`
  border-radius: 12px;
  padding: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid var(--surface);
  position: relative;
  line-height: 20px;
  background: #0d1117;
  white-space: pre-wrap;
  color: #c9d1d9;

  @media (prefers-color-scheme: dark) {
    background: #0d1117;
  }

  @media (max-width: 640px) {
    font-size: 11px;
  }
`;

const CopyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #161b22;
  outline: none;
  border: 1px solid #30363d;
  border-radius: 8px;
  position: absolute;
  top: 12px;
  right: 12px;
  color: #8b949e;
  cursor: copy;
  transition: all 150ms ease;

  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }

  &:hover {
    background: #21262d;
    color: #c9d1d9;
  }

  &:active {
    transform: scale(0.96);
  }
`;

const Shine = styled.div`
  @media (prefers-color-scheme: dark) {
    background: linear-gradient(
      90deg,
      rgba(56, 189, 248, 0),
      #30363d 20%,
      #8b949e 67.19%,
      rgba(236, 72, 153, 0)
    );
    height: 1px;
    position: absolute;
    top: -1px;
    width: 97%;
    z-index: 1;
  }
`;

export function Code({ children }: { children: string }) {
  return (
    <Highlight theme={theme} code={children.trim()} language="javascript">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          <CopyButton aria-label="Copy Code" onClick={() => copy(children)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16h140.1L384 100.1V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V96c0-12.7-5.1-24.9-14.1-33.9L381.9 10.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z" />
            </svg>
          </CopyButton>
          <Shine />
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              <span
                style={{
                  color: '#484f58',
                  marginRight: '16px',
                  userSelect: 'none',
                }}
              >
                {i + 1}
              </span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Pre>
      )}
    </Highlight>
  );
}
