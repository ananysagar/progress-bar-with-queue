import { useRef, useState } from "react";
import "./App.css";

const TOTAL_PROGRESS_ALLOWED = 3;

function App() {
  const idCounter = useRef(0);
  const [queue, setQueue] = useState([]);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [allItems, setAllItems] = useState([]);

  const handleAdd = () => {
    const id = idCounter.current++;
    const newItem = { id, status: "queued" };
    if (inProgressCount >= TOTAL_PROGRESS_ALLOWED) {
      setQueue((prev) => [...prev, newItem]);
    } else {
      newItem.status = "active";
      setInProgressCount((prev) => prev + 1);
    }
    setAllItems((prev) => [...prev, newItem]);
  };
  const handleAnimationEnd = (id) => {
    setAllItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, status: "done" } : item
      )
    );
    if (queue.length) {
      const next = queue[0];
      setQueue((prev) => prev.slice(1));

      setAllItems((prevItems) =>
        prevItems.map((item) =>
          item.id === next.id ? { ...item, status: "active" } : item
        )
      );
    } else {
      setInProgressCount((prev) => Math.max(0, prev - 1));
    }
  };

  return (
    <div className="App">
      <button onClick={handleAdd}>Add to Queue</button>
      <p>Queue: {queue.length}</p>
      <div className="container">
        {allItems.map((item) => (
          <div className="outer" key={item.id}>
            <div
              className={`filler ${item.status === "active" ? "active" : ""} ${
                item.status === "done" ? "done" : ""
              }`}
              onAnimationEnd={() => handleAnimationEnd(item.id)}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
