export function formatReviewTime(value: string | null) {
  if (!value) {
    return "No review time";
  }

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function getLaterTodayReviewTime(now = new Date()) {
  const reviewTime = new Date(now);
  reviewTime.setHours(17, 0, 0, 0);

  if (reviewTime <= now) {
    reviewTime.setDate(reviewTime.getDate() + 1);
    reviewTime.setHours(9, 0, 0, 0);
  }

  return reviewTime.toISOString();
}

export function getTomorrowMorningReviewTime(now = new Date()) {
  const reviewTime = new Date(now);
  reviewTime.setDate(reviewTime.getDate() + 1);
  reviewTime.setHours(9, 0, 0, 0);

  return reviewTime.toISOString();
}
