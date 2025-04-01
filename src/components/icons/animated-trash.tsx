'use client'

import { motion } from 'framer-motion'
import React from 'react'

const AnimatedTrash = () => {
  return (
    <div className="relative w-4 h-4">
      <motion.svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
      >
        {/* Trash bin body */}
        <motion.path
          d="M3 4.5h10v9.5a2 2 0 01-2 2H5a2 2 0 01-2-2V4.5z"
          className="fill-current"
          initial={{ opacity: 1 }}
        />
        
        {/* Vertical lines in the bin */}
        <motion.path
          d="M5.5 7v6M8 7v6M10.5 7v6"
          stroke="currentColor"
          strokeOpacity={0.3}
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Trash lid */}
        <motion.g
          initial={{ translateY: 0, rotateX: 0, originX: 8, originY: 3 }}
          whileHover={{ 
            translateY: -3,
            rotateX: 45,
            transition: { 
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            }
          }}
        >
          <motion.path
            d="M2 3a1 1 0 011-1h10a1 1 0 011 1v1.5H2V3z"
            className="fill-current"
          />
          <motion.path
            d="M6 2a1 1 0 011-1h2a1 1 0 011 1v1H6V2z"
            className="fill-current"
          />
        </motion.g>
      </motion.svg>
    </div>
  )
}

export default AnimatedTrash