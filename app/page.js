"use client";

import { useRef, useState } from "react";

export default function Home() {
  const urlRef = useRef();
  const promptRef = useRef();

  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setImage(urlRef.current.value);
    setText("");

    try {
      const res = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `${promptRef.current.value} ${urlRef.current.value}`,
        }),
      });

      if (!res.ok) {
        throw new Error("Unable to fetch response");
      }

      const data = await res.json();

      setText(data.response.message.content);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mt-6 mx-auto px-4 max-w-2xl flex flex-col gap-4">
      <h1 className="text-4xl font-bold">GPT-4 Image Analyzer</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          placeholder="Enter an Image URL"
          ref={urlRef}
          className="py-2 px-2 w-full bg-white border border-gray-700 placeholder-gray-700 rounded-lg"
        />
        <input
          placeholder="Enter a prompt"
          ref={promptRef}
          className="py-2 px-2 w-full bg-white border border-gray-700 placeholder-gray-700 rounded-lg"
        />
        <button className="uppercase py-2 px-2 rounded-xl bg-lime-700 text-white">
          Analyze
        </button>
      </form>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <img src={image} />
        </div>

        <div>
          <h3 className="text-2xl font-semibold">Response:</h3>
          {loading ? (
            <p className="animate-pulse">Analyzing..</p>
          ) : (
            <p>{text}</p>
          )}
        </div>
      </div>
    </main>
  );
}
