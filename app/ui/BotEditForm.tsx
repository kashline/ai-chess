"use client";

import { BotZype, CreateBotZype } from "@/app/data/zodels/BotZodel";
import Button from "@/app/ui/Button";
import { useState, useEffect, useRef } from "react";

type BotEditFormProps = {
  bot: BotZype | CreateBotZype;
  onSubmit: (data: CreateBotZype | BotZype) => void | Promise<void>;
};

export default function BotEditForm({ bot, onSubmit }: BotEditFormProps) {
  const [name, setName] = useState(bot.Name);
  const [prompt, setPrompt] = useState(bot.Prompt);
  const [errors, setErrors] = useState<{ name?: string; prompt?: string }>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!prompt.trim()) newErrors.prompt = "Prompt is required";
    if (newErrors.name || newErrors.prompt) {
      setErrors(newErrors);
      setStatus("error");
    } else {
      const data = {
        ...bot,
        Name: name,
        Prompt: prompt,
      };
      setStatus("submitting");
      try {
        await onSubmit(data);
        setStatus("success");
      } catch (error) {
        console.log(`There was an error submitting bot: ${error}`);
        setStatus("error");
      }
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // reset first
      textarea.style.height = `${textarea.scrollHeight}px`; // fit to content
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-200">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded"
        />
        {errors.name && <p className="text-chili-red">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200">
          Prompt
        </label>
        <textarea
          value={prompt}
          ref={textareaRef}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded"
        />
        {errors.prompt && <p className="text-chili-red">{errors.prompt}</p>}
      </div>
      {status !== "success" && (
        <div className="flex">
          <Button type="submit" className="mx-auto">
            Save Changes
          </Button>
        </div>
      )}

      {status === "success" && (
        <div className="flex">
          <p className="text-green-600 mx-auto">Successfully submitted bot</p>
        </div>
      )}
      {status === "error" && (
        <div className="flex">
          <p className="text-chili-red mx-auto">
            Failed to submit bot. Fix any validation errors and try again.
          </p>
        </div>
      )}
      {status === "submitting" && (
        <div className="flex">
          <p className="text-lavendar-blush mx-auto">Submitting bot...</p>
        </div>
      )}
    </form>
  );
}
