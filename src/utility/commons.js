function downloadFile(fileName, content, format = "csv") {
  let mimeType;
  let fileExtension;
  switch (format) {
    case "csv":
      mimeType = "text/csv";
      fileExtension = ".csv";
      break;
    case "json":
      mimeType = "application/json";
      fileExtension = ".json";
      break;
    default:
      throw new Error(
        'Invalid format. Supported formats are "csv" and "json".'
      );
  }

  // Create a Blob object from the content
  const blob = new Blob([content], { type: mimeType });

  // Create a temporary URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a link element to trigger the download
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName + fileExtension;

  // Programmatically trigger the download
  link.click();

  // Clean up the temporary URL
  URL.revokeObjectURL(url);
}

export { downloadFile };
