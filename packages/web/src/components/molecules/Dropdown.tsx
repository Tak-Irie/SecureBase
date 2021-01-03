/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef, FC } from 'react';
import { usePopper } from 'react-popper';
import OutsideClickHandler from 'react-outside-click-handler';

const DefaultShownButton: FC = ({ children }) => {
  return (
    <span className="popperDefault">
      <a
        className="hover:text-gray-600 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
        href="#pablo"
      >
        Demo Pages
      </a>
      {children}
    </span>
  );
};

export const Dropdown: FC = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const referenceRef = useRef<HTMLSpanElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);

  const { attributes } = usePopper(referenceRef.current, popperRef.current, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'offset',
        enabled: true,
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  const hide = () => setVisible(false);

  const handleDropdownClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setVisible(true);
  };

  const containerStyle: React.CSSProperties = {
    display: visible ? 'flex' : 'none',
    zIndex: 999,
    flexDirection: 'column',
    backgroundColor: '#FFF',
    borderRadius: '4px',
    boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.14)',
    padding: '10px',
  };

  return (
    <>
      <OutsideClickHandler onOutsideClick={hide}>
        <span ref={referenceRef} onClick={handleDropdownClick}>
          <DefaultShownButton />
        </span>
      </OutsideClickHandler>
      <div ref={popperRef} style={containerStyle} {...attributes.popper}>
        <OutsideClickHandler onOutsideClick={hide}>
          {children}
        </OutsideClickHandler>
      </div>
    </>
  );
};
