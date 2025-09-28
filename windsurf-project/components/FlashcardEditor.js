const { useEffect, useState } = React;

function FlashcardEditor({
  card,
  onAdd,
  onUpdate,
  onDelete,
}) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    setQuestion(card?.question ?? "");
    setAnswer(card?.answer ?? "");
  }, [card?.question, card?.answer]);

  const canUpdate = !!card;

  function handleAdd() {
    const q = question.trim();
    const a = answer.trim();
    if (!q && !a) return;
    onAdd({ question: q, answer: a });
    setQuestion("");
    setAnswer("");
  }

  function handleUpdate() {
    if (!canUpdate) return;
    onUpdate({ question: question.trim(), answer: answer.trim() });
  }

  function handleDelete() {
    if (!canUpdate) return;
    onDelete();
  }

  return (
    <div className="card-shell editor">
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="q">Question</label>
          <textarea
            id="q"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter the question..."
          />
        </div>
        <div>
          <label htmlFor="a">Answer</label>
          <textarea
            id="a"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter the answer..."
          />
        </div>
        <div className="row">
          <button type="button" className="secondary" onClick={handleAdd}>
            Add New
          </button>
          <button type="button" onClick={handleUpdate} disabled={!canUpdate}>
            Save Changes
          </button>
          <button type="button" className="danger" onClick={handleDelete} disabled={!canUpdate}>
            Delete Card
          </button>
        </div>
        <div className="small">Tip: Use Add New to append a new card. Edit fields and Save Changes to update current.</div>
      </form>
    </div>
  );
}

window.FlashcardEditor = FlashcardEditor;
