import { useState } from "react";
import { useEffect } from "react";

import "./App.css";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";

function App() {
  const [feedbackCounts, setFeedbackCounts] = useState(() => {
    const feedbackValues = window.localStorage.getItem("feedback-values");
    if (feedbackValues !== null) {
      return JSON.parse(feedbackValues);
    }
    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  });

  useEffect(() => {
    window.localStorage.setItem(
      "feedback-values",
      JSON.stringify(feedbackCounts)
    );
  }, [feedbackCounts]);

  const resetFeedback = () => {
    setFeedbackCounts({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const totalFeedback = Object.values(feedbackCounts).reduce(
    (total, value) => (total += value),
    0
  );

  const positiveFeedbacks = Math.round(
    ((feedbackCounts.good + feedbackCounts.neutral) / totalFeedback) * 100
  );

  const updateFeedback = (feedbackType) => {
    setFeedbackCounts((state) => ({
      ...state,
      [feedbackType]: state[feedbackType] + 1,
    }));
  };

  return (
    <>
      <h1>Sip Happens Café</h1>
      <p>
        Please leave your feedback about our service by selecting one of the
        options below.
      </p>
      <Options
        resetFeedback={resetFeedback}
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
      ></Options>
      {totalFeedback === 0 && <Notification />}
      {totalFeedback === 0 ? null : (
        <Feedback
          positiveFeedbacks={positiveFeedbacks}
          totalFeedback={totalFeedback}
          feedbackCounts={feedbackCounts}
        ></Feedback>
      )}
    </>
  );
}

export default App;
