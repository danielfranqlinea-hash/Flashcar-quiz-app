const { useEffect, useState } = React;

function Flashcard({ card, index, total }) {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    // Reset when the card changes
    setShowAnswer(false);
  }, [card?.question, card?.answer, index]);

  const hasCards = !!card;

  return (
    <div className="card-shell">
      <div className="flashcard">
        <div className="qa">
          {!hasCards ? (
            <div className="muted">No flashcards yet. Use the editor to add one.</div>
          ) : showAnswer ? (
            <div>{card.answer || <span className="muted">No answer</span>}</div>
          ) : (
            <div>{card.question || <span className="muted">No question</span>}</div>
          )}
        </div>
        <div className="controls">
          <button
            className="ghost"
            onClick={() => setShowAnswer((v) => !v)}
            disabled={!hasCards}
            aria-label="Toggle answer"
          >
            {showAnswer ? "Show Question" : "Show Answer"}
          </button>
          <span className="counter">
            {hasCards ? `${index + 1} / ${total}` : "0 / 0"}
          </span>
        </div>
      </div>
    </div>
  );
}

window.Flashcard = Flashcard;
