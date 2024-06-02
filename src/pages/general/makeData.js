// makeData.js
export const makeData = () => {
  const names = ["Request A", "Request B", "Request C", "Request D"];
  const titles = ["Title A", "Title B", "Title C", "Title D"];
  const statuses = ["Accepted", "Pending", "Rejected"];
  const requesterNames = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"];
  const requesterImages = [
      "https://via.placeholder.com/30",
      "https://via.placeholder.com/30",
      "https://via.placeholder.com/30",
      "https://via.placeholder.com/30",
  ];

  const data = Array.from({ length: 10 }, (_, index) => ({
      name: names[index % names.length],
      title: titles[index % titles.length],
      date: new Date().toISOString(),
      requesterName: requesterNames[index % requesterNames.length],
      requesterImage: requesterImages[index % requesterImages.length],
      status: statuses[index % statuses.length],
      description: `Description for ${names[index % names.length]}`,
  }));

  return data;
};

// Usage
export const data = makeData();
