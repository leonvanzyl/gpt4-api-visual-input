"use client";

import { useRef, useState } from "react";
import StoryPage from "./components/StoryPage";

export default function Home() {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fullStory, setFullStory] = useState([]);

  const storyRef = useRef(null);

  const handleCreateStory = async () => {
    setStory(storyRef.current.value);
    setLoading(true);

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          story: storyRef.current.value,
        }),
      });

      const data = await response.json();

      console.log(data);

      setFullStory(data.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto max-w-4xl p-4">
      {!story && (
        <>
          <h1 className="text-2xl font-bold py-2">Story Time</h1>
          <input
            className="py-2 px-4 border border-blue-500 rounded"
            placeholder="Enter an idea for a story"
            defaultValue="A beautiful princess and a friendly dragon"
            ref={storyRef}
          />
          <button
            onClick={handleCreateStory}
            className="bg-blue-500 text-white py-2 px-4 hover:opacity-90"
          >
            Create Story
          </button>
        </>
      )}

      {loading && (
        <div className="text-2xl h-[100vh] w-full flex items-center justify-center">
          Creating story, please wait...
        </div>
      )}

      <div>
        {fullStory.map((spage) => {
          return (
            <StoryPage
              key={spage.PAGE}
              page={spage.PAGE}
              text={spage.TEXT}
              prompt={spage.PROMPT}
            />
          );
        })}
      </div>
    </main>
  );
}
