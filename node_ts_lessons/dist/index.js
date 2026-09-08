import path from "node:path";
import FileWorker from "./FileWorker.js";
const FILE_TO_PATH = path.join("logs", "logs.txt");
FileWorker.path = FILE_TO_PATH;
let content = await FileWorker.getContent();
await FileWorker.writeToFile(FILE_TO_PATH, content);
const fileData = await FileWorker.readFile(FILE_TO_PATH);
content = fileData?.toString("utf-8") ?? "";
console.log(`Content of file:\n${content}`);
