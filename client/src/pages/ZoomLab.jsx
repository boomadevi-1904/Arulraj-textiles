import React, { useState } from 'react';
import ImageMagnifier from '../components/ImageMagnifier';
import StudioNav from '../components/StudioNav';

const ZoomLab = () => {
  const [src, setSrc] = useState('/images/silk.jpg');

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-serif text-brand-dark mb-4">Fabric Zoom Microscope</h2>
      <StudioNav />
      <div className="flex gap-4 mb-6">
        <button onClick={() => setSrc('/images/silk.jpg')} className="px-4 py-2 border">Silk</button>
        <button onClick={() => setSrc('/images/cotton.jpg')} className="px-4 py-2 border">Cotton</button>
        <button onClick={() => setSrc('/images/denim.jpg')} className="px-4 py-2 border">Denim</button>
      </div>
      <ImageMagnifier src={src} zoom={3} width={500} height={500} />
    </div>
  );
};

export default ZoomLab;
