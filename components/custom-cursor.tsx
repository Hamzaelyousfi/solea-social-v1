'use client'

import { useEffect, useRef, useState } from 'react'

type CursorVariant = 'default' | 'interactive' | 'text' | 'image'

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, [data-cursor="interactive"], [data-cursor="link"]'
const MEDIA_SELECTOR = 'img, video, picture, figure, [data-cursor="image"]'
const TEXT_SELECTOR = 'p, span, h1, h2, h3, h4, h5, h6, li, blockquote, [data-cursor="text"]'
const INACTIVITY_DELAY = 2800

const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor

const scaleByVariant: Record<CursorVariant, number> = {
  default: 1,
  interactive: 1.65,
  text: 0.85,
  image: 1.2,
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number>()
  const inactivityRef = useRef<number>()
  const ringPosition = useRef({ x: 0, y: 0 })
  const ringTarget = useRef({ x: 0, y: 0 })
  const ringScale = useRef(1)
  const ringScaleTarget = useRef(1)
  const magnetRect = useRef<DOMRect | null>(null)

  const [isEligible, setIsEligible] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isIdle, setIsIdle] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [variant, setVariant] = useState<CursorVariant>('default')

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const finePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    if (finePointer && !hasTouch && !prefersReducedMotion) {
      setIsEligible(true)
    }
  }, [])

  useEffect(() => {
    const baseScale = scaleByVariant[variant] ?? 1
    ringScaleTarget.current = baseScale + (isPressed ? 0.2 : 0)
  }, [variant, isPressed])

  useEffect(() => {
    if (!isEligible) {
      return
    }

    const body = document.body
    body.classList.add('custom-cursor-active')

    const render = () => {
      ringPosition.current.x = lerp(ringPosition.current.x, ringTarget.current.x, 0.15)
      ringPosition.current.y = lerp(ringPosition.current.y, ringTarget.current.y, 0.15)
      ringScale.current = lerp(ringScale.current, ringScaleTarget.current, 0.2)

      if (ringRef.current) {
        ringRef.current.style.setProperty('--cursor-x', `${ringPosition.current.x}px`)
        ringRef.current.style.setProperty('--cursor-y', `${ringPosition.current.y}px`)
        ringRef.current.style.setProperty('--cursor-scale', ringScale.current.toString())
      }

      frameRef.current = window.requestAnimationFrame(render)
    }

    frameRef.current = window.requestAnimationFrame(render)

    return () => {
      body.classList.remove('custom-cursor-active')
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current)
      }
      if (inactivityRef.current) {
        window.clearTimeout(inactivityRef.current)
      }
    }
  }, [isEligible])

  useEffect(() => {
    if (!isEligible) {
      return
    }

    const resetInactivityTimer = () => {
      setIsIdle(false)
      if (inactivityRef.current) {
        window.clearTimeout(inactivityRef.current)
      }
      inactivityRef.current = window.setTimeout(() => {
        setIsIdle(true)
        setIsVisible(false)
      }, INACTIVITY_DELAY)
    }

    const updateTargets = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null
      const mediaElement = target?.closest(MEDIA_SELECTOR) as HTMLElement | null
      const interactiveElement = target?.closest(INTERACTIVE_SELECTOR) as HTMLElement | null
      const textElement = target?.closest(TEXT_SELECTOR) as HTMLElement | null

      if (mediaElement) {
        setVariant('image')
        magnetRect.current = mediaElement.getBoundingClientRect()
      } else if (interactiveElement) {
        setVariant('interactive')
        magnetRect.current = interactiveElement.getBoundingClientRect()
      } else if (textElement) {
        setVariant('text')
        magnetRect.current = null
      } else {
        setVariant('default')
        magnetRect.current = null
      }
    }

    const handlePointerMove = (event: PointerEvent) => {
      setIsVisible(true)
      resetInactivityTimer()
      updateTargets(event)

      if (dotRef.current) {
        dotRef.current.style.setProperty('--cursor-x', `${event.clientX}px`)
        dotRef.current.style.setProperty('--cursor-y', `${event.clientY}px`)
      }

      const magnet = magnetRect.current
      if (magnet) {
        const magnetX = magnet.left + magnet.width / 2
        const magnetY = magnet.top + magnet.height / 2
        ringTarget.current.x = event.clientX + (magnetX - event.clientX) * 0.2
        ringTarget.current.y = event.clientY + (magnetY - event.clientY) * 0.2
      } else {
        ringTarget.current.x = event.clientX
        ringTarget.current.y = event.clientY
      }
    }

    const handlePointerDown = () => setIsPressed(true)
    const handlePointerUp = () => setIsPressed(false)
    const handlePointerLeave = () => {
      setIsVisible(false)
      setIsIdle(true)
      magnetRect.current = null
    }

    document.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('pointerdown', handlePointerDown, { passive: true })
    document.addEventListener('pointerup', handlePointerUp, { passive: true })
    document.addEventListener('pointercancel', handlePointerLeave, { passive: true })
    document.addEventListener('pointerleave', handlePointerLeave, { passive: true })

    return () => {
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('pointerup', handlePointerUp)
      document.removeEventListener('pointercancel', handlePointerLeave)
      document.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [isEligible])

  if (!isEligible) {
    return null
  }

  return (
    <>
      <div
        ref={ringRef}
        className="custom-cursor-circle"
        data-variant={variant}
        data-visible={isVisible}
        data-idle={isIdle}
        data-pressed={isPressed}
        aria-hidden
      >
        <span className="custom-cursor-label" data-visible={variant === 'image'}>
          view
        </span>
        <span className="custom-cursor-text-indicator" data-visible={variant === 'text'} />
      </div>
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        data-visible={isVisible}
        data-idle={isIdle}
        aria-hidden
      />
    </>
  )
}
