import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!text.trim()) {
      alert("Please enter some text");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/summarize/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSummary(data.summary);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to generate summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>AI Summarizer</h1>
        <p>Turn long text into clear, concise summaries.</p>
      </header>

      <main>
        <section className="input-section">
          <label htmlFor="input-text">Your text</label>

          <textarea
            id="input-text"
            placeholder="Paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={loading}
          />

          <div className="input-footer">
            <span>{text.length} characters</span>
            <button onClick={handleSummarize} disabled={loading}>
              {loading ? "Summarizing..." : "Summarize"}
            </button>
          </div>
        </section>

        <section className="output-section">
          <h2>Summary</h2>
          {error && (
            <div style={{ color: "#ef4444", marginBottom: "12px", fontSize: "14px" }}>
              {error}
            </div>
          )}
          <div className="summary-box" style={{ color: summary ? "#f5f5f5" : "#9ca3af" }}>
            {loading ? "Generating summary, please wait..." : (summary || "Your summary will appear here...")}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;