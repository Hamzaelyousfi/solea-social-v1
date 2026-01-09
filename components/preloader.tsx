'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function Preloader() {
  const [isActive, setIsActive] = useState(true)
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isAdmin || !isActive) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="text-5xl md:text-6xl font-bold" aria-hidden>
            <span>We craft</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="text-5xl md:text-6xl font-bold" aria-hidden>
            <span>bold digital</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-5xl md:text-6xl font-bold" aria-hidden>
            <span className="text-accent">stories</span>
          </div>
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.8, delay: 0.2, ease: 'easeInOut' }}
          className="mt-12 h-1 w-20 mx-auto bg-accent rounded-full origin-left"
        />
      </motion.div>
    </motion.div>
  )
}
