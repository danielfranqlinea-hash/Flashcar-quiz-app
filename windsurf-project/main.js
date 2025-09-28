const { useEffect, useMemo, useState } = React;

const STORAGE_KEY = "flashcards_v1";

function useLocalStorageState(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);

  return [state, setState];
}

function App() {
  const [cards, setCards] = useLocalStorageState(STORAGE_KEY, []);
  const [index, setIndex] = useState(0);

  const total = cards.length;
  const current = useMemo(() => cards[index] ?? null, [cards, index]);

  useEffect(() => {
    // Keep index in bounds if the list shrinks
    if (index > 0 && index >= total) {
      setIndex(total - 1);
    }
  }, [index, total]);

  function next() {
    if (!total) return;
    setIndex((i) => (i + 1) % total);
  }

  function prev() {
    if (!total) return;
    setIndex((i) => (i - 1 + total) % total);
  }

  function addCard(newCard) {
    setCards((prev) => [...prev, newCard]);
    if (total === 0) {
      setIndex(0);
    }
  }

  function updateCard(patch) {
    setCards((prev) => {
      if (!prev[index]) return prev;
      const nextCards = [...prev];
      nextCards[index] = { ...nextCards[index], ...patch };
      return nextCards;
    });
  }

  function deleteCard() {
    setCards((prev) => {
      if (!prev[index]) return prev;
      const nextCards = prev.slice();
      nextCards.splice(index, 1);
      return nextCards;
    });
    setIndex((i) => Math.max(0, i - 1));
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Flashcard Quiz App</h1>
        <div className="nav">
          <div className="controls">
            <button onClick={prev} disabled={total === 0}>Previous</button>
            <button onClick={next} disabled={total === 0}>Next</button>
          </div>
        </div>
      </div>

      <div className="app-grid">
        <Flashcard card={current} index={index} total={total} />

        <FlashcardEditor
          card={current}
          onAdd={addCard}
          onUpdate={updateCard}
          onDelete={deleteCard}
        />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
