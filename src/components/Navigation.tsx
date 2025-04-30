'use client';
import React from 'react';
import styles from './Navigation.module.css';
import Image from 'next/image';

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Image 
          src="/shadetellerlogo.svg" 
          alt="Shade Teller Logo" 
          width={220} 
          height={60} 
          className={styles.logo}
          priority
        />
        <button 
          aria-label="Shopping cart" 
          className={styles.cartButton}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </button>
      </div>
    </nav>
  );
} 