import React from 'react';
import { FancyHeaderWrapper } from './fancy-header.style';

export default function FancyHeader({ title, subtitle }) {
  return (
    <FancyHeaderWrapper className="FancyHeader fadeInUp animated faster">
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
    </FancyHeaderWrapper>
  );
}
