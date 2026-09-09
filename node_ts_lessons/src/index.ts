import path from "node:path";
import FileWorker from "./FileWorker.js";






const FILE_TO_PATH = path.join("logs", "logs.txt");

FileWorker.path = FILE_TO_PATH;

let content: string = await FileWorker.getContent();

await FileWorker.writeToFile(FILE_TO_PATH, content);

const fileData = await FileWorker.readFile(FILE_TO_PATH);

content = fileData?.toString("utf-8") ?? "";

console.log(`Content of file:\n${content}`);


// 1. access()
const exists = await FileWorker.exists(FILE_TO_PATH);
console.log("File exists:", exists);


// 2. stat()
await FileWorker.getInfo(FILE_TO_PATH);


// 3. readdir()
const files = await FileWorker.getFiles("logs");
console.log("Files:", files);


// 4. copyFile()
const COPY_PATH = path.join("logs", "logs-copy.txt");

await FileWorker.copy(FILE_TO_PATH, COPY_PATH);
console.log("File copied");


// 5. rename()
const RENAMED_PATH = path.join("logs", "logs-renamed.txt");

await FileWorker.rename(COPY_PATH, RENAMED_PATH);
console.log("File renamed");


// 6. realpath()
const realPath = await FileWorker.getRealPath(FILE_TO_PATH);

console.log("Real path:", realPath);


// 7. truncate()
await FileWorker.truncate(RENAMED_PATH, 10);

console.log("File truncated");


// 8. unlink()
await FileWorker.deleteFile(RENAMED_PATH);

console.log("File deleted");


// 9. mkdtemp()
const TEMP_PREFIX = path.join(process.cwd(), "temp-");

const tempFolder = await FileWorker.createTempFolder(TEMP_PREFIX);

console.log("Temp folder:", tempFolder);


// 10. rm()
await FileWorker.remove(tempFolder);

console.log("Temp folder removed");