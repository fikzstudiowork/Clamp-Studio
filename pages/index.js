import React from 'react';
import dynamic from 'next/dynamic';

const ClampStudio = dynamic(() => import('../components/ClampStudio'), { ssr: false });

export default function Home() {
  return React.createElement(ClampStudio, {});
}
