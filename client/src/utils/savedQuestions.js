const SAVED_QUESTIONS_KEY = 'saved-question-ids';

export const getSavedQuestionIds = () => {
  try {
    const raw = localStorage.getItem(SAVED_QUESTIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('[SavedQuestions] Failed to parse saved questions.', error);
    return [];
  }
};

export const setSavedQuestionIds = (ids) => {
  localStorage.setItem(SAVED_QUESTIONS_KEY, JSON.stringify(ids));
};

export const isQuestionSaved = (questionId) => {
  if (!questionId) return false;
  return getSavedQuestionIds().includes(questionId);
};

export const toggleSavedQuestion = (questionId) => {
  if (!questionId) return false;

  const existing = getSavedQuestionIds();
  const hasQuestion = existing.includes(questionId);
  const next = hasQuestion
    ? existing.filter((id) => id !== questionId)
    : [...existing, questionId];

  setSavedQuestionIds(next);
  return !hasQuestion;
};
