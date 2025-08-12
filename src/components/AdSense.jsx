'use client';

import { useEffect, useRef, useState } from 'react';
import AdSenseConfig from '@/config/adsense';

const AdSense = ({ slotKey, format, responsive = true, style = {} }) => {
  const adRef = useRef(null);
  const slot = AdSenseConfig.slots[slotKey];
  const [isMounted, setIsMounted] = useState(false); 
  const [randomColor, setRandomColor] = useState('');

  useEffect(() => {
    setIsMounted(true);
    const colors = ['#e9efff', '#fff4e6', '#e8f5e9', '#f3e5f5'];
    setRandomColor(colors[Math.floor(Math.random() * colors.length)]);

    try {
      // Always request ad fill after mount when script is available
      if (adRef.current) {
        // eslint-disable-next-line no-undef
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  // If slot is not found, don't display the ad
  if (!slot) {
    console.warn(`AdSense slot with key "${slotKey}" not found in config`);
    return null;
  }

  // Show ad placeholder in development mode
  if (AdSenseConfig.isTest && isMounted) {
    const isHorizontal = format === 'horizontal';
    const isVertical = format === 'vertical';
    
    let mockHeight = style.minHeight || '250px';
    let mockWidth = style.width || '100%';
    
    // Determine placeholder dimensions based on format
    if (isVertical) {
      mockHeight = style.minHeight || '600px';
      mockWidth = style.width || '160px';
    } else if (isHorizontal) {
      mockHeight = style.minHeight || '90px';
      mockWidth = style.width || '728px';
    }
    
    return (
      <div className="ad-container">
        <div 
          style={{ 
            backgroundColor: randomColor, 
            border: '1px dashed #3b82f6',
            padding: '5px',
            width: mockWidth,
            height: mockHeight,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '14px',
            color: '#333',
            borderRadius: '4px',
            ...style
          }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
            AdSense Ad Block
          </div>
          <div style={{ fontSize: '12px', textAlign: 'center' }}>
            Slot: {slotKey}<br/>
            ID: {slot}<br/>
            Format: {format || 'auto'}
          </div>
        </div>
      </div>
    );
  }

  // Спочатку повертаємо порожній div для SSR, щоб уникнути помилок гідратації
  if (!isMounted) {
    return <div className="ad-container" style={style}></div>;
  }

  return (
    <div className="ad-container">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          overflow: 'hidden',
          ...style,
        }}
        data-ad-client={AdSenseConfig.client}
        data-ad-slot={slot}
        data-ad-format={format || 'auto'}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};

export default AdSense; 