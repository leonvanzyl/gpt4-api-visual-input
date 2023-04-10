"use client";
import React, { useEffect, useState } from "react";

function StoryPage({ page, prompt, text }) {
  const [loadingImage, setLoadingImage] = useState(false);

  const [image, setImage] = useState(null);
  console.log("image: ", image);

  useEffect(() => {
    async function generateImage(prompt) {
      console.log("fetching image for prompt: ", prompt);
      setLoadingImage(true);

      try {
        const resp = await fetch("/api/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });

        const data = await resp.json();

        setImage(data.url);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoadingImage(false);
      }
    }

    generateImage(prompt);
  }, []);

  return (
    <div className="grid grid-cols-2 items-center gap-4 h-[100vh]">
      <h3 className="text-4xl">{text}</h3>

      {loadingImage && <p>Creating image...</p>}
      {!loadingImage && <img src={image} />}
    </div>
  );
}

export default StoryPage;
