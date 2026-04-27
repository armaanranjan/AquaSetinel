export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("http://localhost:5000/upload", {
    method: "POST",
    body: formData,
  });

  return res.json();
}

// ✅ ADD THIS FUNCTION (you missed this earlier)
export async function getDriftData() {
  const res = await fetch("http://localhost:5000/drift");
  return res.json();
}