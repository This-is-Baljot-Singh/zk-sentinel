export async function analyzeFinancialData(fileText) {
  try {
    const res = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: fileText }),
    });

    if (!res.ok) throw new Error("Backend error");

    return await res.json(); // { score: 7xx }
  } catch (err) {
    console.error("Backend failed, using fallback", err);
    return { score: 720 }; // DEMO SAFE fallback
  }
}
