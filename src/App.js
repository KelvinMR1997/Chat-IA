import React, { useState } from "react";
import "./App.css";
const App = () => {
  const [message, setMessage] = useState();
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const query = await fetch("http://localhost:3001/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    const result = await query.json();
    setResponse(result.message);
    setIsLoading(false);
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Pregunta cualquier cosa
          </label>
          <textarea
            className="form-control"
            placeholder="Pregunta algo..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button className="btn te btn-primary btn md" type="submit">
          Submit
        </button>
      </form>

      {isLoading ? (
        <div className="spinner-border text-primary my-3" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      ) : (
        <div>{response}</div>
      )}
    </div>
  );
};

export default App;
