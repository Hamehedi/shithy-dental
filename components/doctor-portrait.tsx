"use client"

import { useState } from "react"
import { LineMark } from "./line-mark"
import { site } from "@/lib/site"

/**
 * The single reserved slot for the doctor's real photograph.
 * Drop the uploaded image at /public/images/dr-shithy.jpg and it appears here.
 * Until then, a quiet framed placeholder holds the composition — no stock photo.
 */
export function DoctorPortrait({ className }: { className?: string }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative overflow-hidden rounded-sm bg-bone-deep ${className ?? ""}`}>
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/dr-shithy.jpg"
          alt={`Portrait of ${site.doctor.name}`}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 border border-dashed border-stone-soft/70 px-6 text-center">
          <LineMark className="h-16 w-16 text-pine/70" animate={false} />
          <p className="max-w-[16rem] font-serif text-lg leading-snug text-pine">
            {site.doctor.name}
          </p>
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-stone">
            Photograph to be added
          </p>
        </div>
      )}
      {/* thin frame line */}
      <div className="pointer-events-none absolute inset-3 rounded-sm border border-bone/40" />
    </div>
  )
}
