import * as fs from "node:fs/promises";
import path from "node:path";
import * as readline from "node:readline/promises";
import { stdout as output, stdin as input } from "node:process";
export default class FileWorker {
    static path_to_file;
    static set path(path) {
        FileWorker.path_to_file = path;
    }
    static async getContent() {
        const rl = readline.createInterface({ input, output });
        try {
            const content = await rl.question("Enter your content: ");
            return content;
        }
        catch (error) {
            console.log(`no data ${error}`);
            return "";
        }
        finally {
            rl.close();
        }
    }
    static async createFolderIfNotExists(filePath) {
        const folderPath = path.dirname(filePath);
        await fs.mkdir(folderPath, { recursive: true });
    }
    static async writeToFile(filePath, content) {
        try {
            await FileWorker.createFolderIfNotExists(filePath);
            await fs.appendFile(filePath, content + "\n", "utf-8");
            console.log("Файл успішно збережено");
        }
        catch (error) {
            console.log("Файл не збережено", error);
        }
    }
    static async readFile(filePath) {
        try {
            return await fs.readFile(filePath);
        }
        catch (error) {
            console.error(`My error: ${error}`);
        }
    }
}
