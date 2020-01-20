var PORT = process.env.PORT || 8080;
const server = require("./server");

// Start server
server.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
