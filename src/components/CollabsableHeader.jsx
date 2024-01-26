import React, { useState } from 'react';
import '../styles/collapsible.scss';
import { IconChevronUp } from '@tabler/icons-react';
import { IconChevronDown } from '@tabler/icons-react';

const CollapsibleHeader = ({ title }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="collapsible">
      <div className="collapsible-header" onClick={() => setIsOpen(!isOpen)}>
        {title}
        {isOpen ? <IconChevronUp /> : <IconChevronDown />}
      </div>
      {isOpen &&
        <div className="collapsible-content">
          filler text filler text filler text
        </div>
      }
    </div>
  );
};

export default CollapsibleHeader;
