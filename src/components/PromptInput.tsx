import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PromptInputProps {
  onSubmit: (prompt: string, analysisType: string, videoUrl: string) => void
  initialVideoUrl: string
}

export default function PromptInput({ onSubmit, initialVideoUrl }: PromptInputProps) {
  const [prompt, setPrompt] = useState("")
  const [analysisType, setAnalysisType] = useState("general")
  const [videoUrl, setVideoUrl] = useState(initialVideoUrl)

  useEffect(() => {
    setVideoUrl(initialVideoUrl)
  }, [initialVideoUrl])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(prompt, analysisType, videoUrl)
  }

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-blue-800">AI Prompt</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 mb-4">
          <Select value={analysisType} onValueChange={setAnalysisType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Analysis Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Analysis</SelectItem>
              <SelectItem value="exit-speed">Exit Speed</SelectItem>
              <SelectItem value="hit-speed">Hit Speed</SelectItem>
              <SelectItem value="hand-strength">Hand Strength</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Enter video URL"
          className="w-full mb-4"
        />
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt about the video..."
          className="w-full mb-4"
          rows={4}
        />
        <Button type="submit" className="w-full">
          Analyze
        </Button>
      </form>
    </Card>
  )
}

