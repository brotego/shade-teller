'use client';
import React from 'react';
import styles from './ProductRecommendation.module.css';
import Image from 'next/image';

interface ProductRecommendationProps {
  shadeNumber: string;
}

export default function ProductRecommendation({ shadeNumber }: ProductRecommendationProps) {
  const imageUrl = `/${shadeNumber}.webp`;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Shade Recommendation</h2>
      
      <div className={styles.price}>$40.00</div>
      
      <div className={styles.productCard}>
        <div className={styles.imageContainer}>
          <Image
            src={imageUrl}
            alt={`Soft'lit Foundation Shade ${shadeNumber}`}
            width={300}
            height={400}
            className={styles.productImage}
            priority
          />
        </div>
        
        <div className={styles.navigation}>
          <button className={styles.navButton} aria-label="Previous">
            <span>◀</span>
          </button>
          <button className={styles.navButton} aria-label="Next">
            <span>▶</span>
          </button>
        </div>
      </div>

      <div className={styles.productInfo}>
        <h3 className={styles.productName}>
          Soft&apos;lit Naturally Luminous Longwear Foundation
        </h3>
        <p className={styles.shadeNumber}>Shade {shadeNumber}</p>
        <p className={styles.description}>
          A lightweight, buildable formula that&apos;s perfect for everyday wear.
        </p>
      </div>
    </div>
  );
} 