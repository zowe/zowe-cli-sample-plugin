const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("mockZosmfDb.json"); // Path to your db.json file
const middlewares = jsonServer.defaults();

// Custom middleware to block non-GET requests
server.use((req, res, next) => {
    if (req.method !== "GET") {
        return res.status(403).json({
            error: "Read-only mode: Only GET requests are allowed"
        });
    }
    next(); // Continue to JSON Server router
});

// Define custom routes using the rewriter
const customRoutes = jsonServer.rewriter({
    "/zosmf/*": "/$1"
    // Add other custom routes as needed
});

server.use(middlewares);
server.use(customRoutes); // Use the custom routes middleware
server.use(router);
server.listen(3000, () => {
    console.log("JSON Server is running on http://localhost:3000");
});