export default function Feedback({
  totalFeedback,
  feedbackCounts,
  positiveFeedbacks,
}) {
  return (
    <>
      <p>Good:{feedbackCounts.good}</p>
      <p>Neutral{feedbackCounts.neutral}:</p>
      <p>Bad:{feedbackCounts.bad}</p>
      <p>Total:{totalFeedback}</p>
      <p>Positive:{positiveFeedbacks}%</p>
    </>
  );
}
