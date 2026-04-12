// Shared data across all showcase options
export const stats = [
  { label: 'Quota Attainment', value: '124%' },
  { label: 'Avg Deal Size', value: '$823K' },
  { label: "President's Club", value: '2x' },
  { label: 'Pipeline Built', value: '$3.2M' },
]

export const question = "Walk me through your biggest competitive win."

export const attempts = [
  "I managed a large enterprise territory where I",
  "So there was this deal where we displaced the incumbent and I",
  "My biggest win was probably when we closed — it was like an 800K",
  "The deal was, so basically I had this account where they were with",
]

export const answer = "Displaced an 8-year incumbent. $823K deal, 94-day cycle. The challenge was they had relationships everywhere — I had to build my own coalition from scratch. Anchored with the ops team first, got finance aligned, then used that momentum to get in front of the CFO. Three-year commitment on the close."

export const closingLine = ["Same person. Same track record.", "Finally translated."]

// Helper: get typing text from attempts based on progress within a range
export function getTypingState(progress, startAt, endAt) {
  if (progress < startAt || progress > endAt) return { text: '', cursor: false, phase: 'none' }

  const span = endAt - startAt
  const local = (progress - startAt) / span

  for (let i = 0; i < attempts.length; i++) {
    const aStart = i / attempts.length
    const typeEnd = aStart + 0.6 / attempts.length
    const delStart = aStart + 0.75 / attempts.length
    const delEnd = (i + 1) / attempts.length

    if (local >= aStart && local < typeEnd) {
      const frac = (local - aStart) / (typeEnd - aStart)
      return { text: attempts[i].slice(0, Math.floor(frac * attempts[i].length)), cursor: true, phase: 'typing', attempt: i }
    }
    if (local >= typeEnd && local < delStart) {
      return { text: attempts[i], cursor: true, phase: 'pause', attempt: i }
    }
    if (local >= delStart && local < delEnd) {
      const frac = (local - delStart) / (delEnd - delStart)
      const remaining = Math.floor((1 - frac) * attempts[i].length)
      return { text: attempts[i].slice(0, Math.max(0, remaining)), cursor: true, phase: 'deleting', attempt: i }
    }
  }
  return { text: '', cursor: true, phase: 'empty' }
}
