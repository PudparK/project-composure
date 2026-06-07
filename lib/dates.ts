export function formatReviewTime(value: string | null) {
  if (!value) {
    return "Later";
  }

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function getTonightReviewTime(now = new Date()) {
  const reviewTime = new Date(now);
  reviewTime.setHours(20, 0, 0, 0);

  if (reviewTime <= now) {
    reviewTime.setDate(reviewTime.getDate() + 1);
  }

  return reviewTime.toISOString();
}

export function getTomorrowMorningReviewTime(now = new Date()) {
  const reviewTime = new Date(now);
  reviewTime.setDate(reviewTime.getDate() + 1);
  reviewTime.setHours(9, 0, 0, 0);

  return reviewTime.toISOString();
}

export function getThisWeekendReviewTime(now = new Date()) {
  const reviewTime = new Date(now);
  const day = reviewTime.getDay();
  const saturday = 6;
  const daysUntilSaturday = (saturday - day + 7) % 7 || 7;

  reviewTime.setDate(reviewTime.getDate() + daysUntilSaturday);
  reviewTime.setHours(10, 0, 0, 0);

  return reviewTime.toISOString();
}
