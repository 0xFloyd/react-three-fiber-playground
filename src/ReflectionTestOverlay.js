import React from 'react'

export default function ReflectionTestOverlay({
  ready,
  clicked,
  setClicked
}) {
  return (
    <>
      <div
        className={`fullscreen bg ready'} ${clicked && 'clicked'}`}
      >
        <div onClick={() => ready && setClicked(true)}>
          {!ready ? 'loading' : 'click to continue'}
        </div>
      </div>
    </>
  )
}
