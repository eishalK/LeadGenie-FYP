import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Sparkles, MessageSquare, Copy, Check, Info } from "lucide-react";
import { generateAIContentService } from "../../services/authService";
import toast from "react-hot-toast";

const AICopywriterView = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [description, setDescription] = useState("");
  const [format, setFormat] = useState("Email Marketing Campaign Text");

  const [loading, setLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState("");
  const [copied, setCopied] = useState(false);
  
  // State to toggle the format helper guide
  const [showGuide, setShowGuide] = useState(false);

  // Custom Lightweight Parser to render bold text, lists, and headings 
  const parseMarkdownToJSX = (text) => {
    if (!text) return null;

    return text.split("\n").map((line, index) => {
      let trimmedLine = line.trim();

      // Handle Headings (### or ## or #)
      if (trimmedLine.startsWith("###") || trimmedLine.startsWith("##") || trimmedLine.startsWith("#")) {
        const cleanText = trimmedLine.replace(/^#+\s*/, "");
        return (
          <h3 key={index} className="text-sm font-semibold text-orange-400 mt-4 mb-2 tracking-wide">
            {renderBoldText(cleanText)}
          </h3>
        );
      }

      // Handle Bullet Points (* or -)
      if (trimmedLine.startsWith("* ") || trimmedLine.startsWith("- ")) {
        const cleanText = trimmedLine.substring(2);
        return (
          <ul key={index} className="list-disc pl-5 space-y-1 my-1 text-gray-300">
            <li className="pl-0.5">{renderBoldText(cleanText)}</li>
          </ul>
        );
      }

      // Handle Empty Paragraph Breaks
      if (trimmedLine === "") {
        return <div key={index} className="h-2" />;
      }

      // Handle Standard Body Lines
      return (
        <p key={index} className="text-gray-300 leading-relaxed mb-1">
          {renderBoldText(line)}
        </p>
      );
    });
  };

  // Helper function to turn **bold markdown text** into real web text highlights
  const renderBoldText = (text) => {
    const parts = text.split(/\*\*([\s\S]*?)\*\*/g);
    return parts.map((part, i) => {
      // Every odd element in the split split-array was surrounded by ** asterisks
      if (i % 2 === 1) {
        return (
          <strong key={i} className="font-bold text-white bg-white/5 px-1 rounded text-[11px]">
            {part}
          </strong>
        );
      }
      return part;
    });
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      return toast.error("Please add a description of your business parameters.");
    }

    setLoading(true);
    setGeneratedResult(""); 

    try {
      const response = await generateAIContentService(description, format);
      setGeneratedResult(response.content);
      toast.success("Marketing copy generated successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong during generation.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (!generatedResult) return;
    navigator.clipboard.writeText(generatedResult);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000); 
  };

  const handleInsertTemplate = () => {
    const template = `Product/Business Name: \nTarget Audience: \nCore Problem Solved: \nKey Features/Services: \nSpecial Offer/CTA: `;
    setDescription(template);
    toast.success("Template inserted! Just fill in the details.");
  };

  return (
    <div className="flex min-h-screen bg-[#0a051a] text-white">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">AI Content Copywriter</h1>
          <p className="text-gray-400 text-xs mt-1">
            Generate marketing messages for emails, ads, or social posts instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          <form 
            onSubmit={handleGenerate}
            className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl space-y-5"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs text-gray-400 font-medium pl-1">
                  Describe your business parameters
                </label>
                
                <button
                  type="button"
                  onClick={() => setShowGuide(!showGuide)}
                  className="text-[11px] text-orange-400 hover:text-orange-300 flex items-center gap-1 bg-orange-500/10 px-2 py-1 rounded-md border border-orange-500/20 transition-all cursor-pointer"
                >
                  <Info size={12} /> {showGuide ? "Hide Format Guide" : "Show Recommended Format"}
                </button>
              </div>

              {showGuide && (
                <div className="mb-3 p-3.5 bg-[#110a2c] border border-white/10 rounded-xl text-[11px] space-y-2 text-gray-300">
                  <p className="font-semibold text-white">For the best AI results, try structuring your text like this:</p>
                  <div className="bg-white/5 p-2 rounded font-mono text-gray-400 select-all whitespace-pre-line">
                    {"Product Name: [Name]\nTarget Audience: [Who is this for?]\nCore Problem Solved: [What pain point do you fix?]\nKey Features: [Feature 1, Feature 2]\nSpecial Offer: [e.g., 14-day free trial]"}
                  </div>
                  <button
                    type="button"
                    onClick={handleInsertTemplate}
                    className="text-[10px] bg-white/10 hover:bg-white/10 text-white font-medium px-2 py-1 rounded transition-colors mt-1 cursor-pointer"
                  >
                    + Insert Empty Template Into Textbox
                  </button>
                </div>
              )}

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., We run a local boutique gym offering high-tier functional strength training, yoga circles, and specialized nutritional tracks."
                className="w-full h-36 bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white outline-none focus:border-orange-500 transition-all resize-none leading-relaxed"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 font-medium mb-2 pl-1">
                Target Content Output Format
              </label>
              <select 
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full bg-[#110a2c] border border-white/10 rounded-xl py-3.5 px-4 text-xs text-white outline-none focus:border-orange-500 transition-all cursor-pointer"
                disabled={loading}
              >
                <option value="Email Marketing Campaign Text">Email Marketing Campaign Text</option>
                <option value="High-Converting Facebook / Instagram Advertisement Copy">
                  High-Converting Facebook / Instagram Advertisement Copy
                </option>
                <option value="Welcome Newsletter Notification Template">Welcome Newsletter Notification Template</option>
              </select>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-500 disabled:bg-gray-800 disabled:text-gray-500 py-3.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-orange-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? (
                <>Analyzing Parameters... <span className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></span></>
              ) : (
                <>Generate Content <Sparkles size={14} /></>
              )}
            </button>
          </form>

          {/* AI Output Display Section */}
          { (generatedResult || loading) && (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl flex flex-col min-h-[270px]">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2 text-xs font-medium text-orange-400">
                  <MessageSquare size={16} /> LeadGenie AI Generation Output
                </div>
                {generatedResult && (
                  <button
                    onClick={handleCopyToClipboard}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 cursor-pointer"
                  >
                    {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                )}
              </div>

              {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center space-y-3 text-gray-400 py-12">
                  <div className="h-6 w-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs tracking-wide animate-pulse">Gemini compiling creative assets...</p>
                </div>
              ) : (
                <div className="text-xs text-gray-200 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                  {parseMarkdownToJSX(generatedResult)}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AICopywriterView;