const { spawn } = require("child_process");
const path = require("path");

const handleGenerateCampaign = async (req, res) => {
  const { productType, ageDemographics, personaDescription, budget } = req.body;

  if (!productType || !personaDescription) {
    return res
      .status(400)
      .json({ message: "Product type and target persona description are required." });
  }

  const payload = JSON.stringify({
    productType,
    ageDemographics,
    personaDescription,
    budget: budget || "0",
  });

  const pythonScriptPath = path.resolve(__dirname, "../aiServices/campaignService.py");
  const pyProcess = spawn("python", [pythonScriptPath, payload], {
    env: { ...process.env }, // Pass environment variables (API keys) to Python
  });

  let resultData = "";
  let errorData = "";

  pyProcess.stdout.on("data", (data) => {
    resultData += data.toString();
  });

  pyProcess.stderr.on("data", (data) => {
    errorData += data.toString();
  });

  pyProcess.on("close", (code) => {
    if (code !== 0) {
      console.error("Python Process Error:", errorData);
      return res
        .status(500)
        .json({ message: "Failed to run campaign research script." });
    }

    try {
      const parsedResult = JSON.parse(resultData.trim());
      if (parsedResult.error) {
        return res.status(500).json({ message: parsedResult.error });
      }
      return res.status(200).json({ success: true, data: parsedResult });
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError, resultData);
      return res
        .status(500)
        .json({ message: "Invalid output from AI engine." });
    }
  });
};

module.exports = {
  handleGenerateCampaign,
};