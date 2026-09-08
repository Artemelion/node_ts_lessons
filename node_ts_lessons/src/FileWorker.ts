import * as fs from "node:fs/promises";
import path from "node:path";
import * as readline from "node:readline/promises";
import { stdout as output, stdin as input } from "node:process";

export default class FileWorker {
  private static path_to_file: string;

  public static set path(path: string) {
    FileWorker.path_to_file = path;
  }

  public static async getContent(): Promise<string> {
    const rl = readline.createInterface({ input, output });

    try {
      const content: string = await rl.question("Enter your content: ");
      return content;
    } catch (error) {
      console.log(`No data: ${error}`);
      return "";
    } finally {
      rl.close();
    }
  }

  private static async createFolderIfNotExists(
    filePath: string
  ): Promise<void> {
    const folderPath = path.dirname(filePath);

    await fs.mkdir(folderPath, { recursive: true });
  }

  public static async writeToFile(
    filePath: string,
    content: string
  ): Promise<void> {
    try {
      await FileWorker.createFolderIfNotExists(filePath);

      await fs.appendFile(filePath, content + "\n", "utf-8");

      console.log("File saved");
    } catch (error) {
      console.log("File not saved", error);
    }
  }

  public static async readFile(
    filePath: string
  ): Promise<Buffer | undefined> {
    try {
      return await fs.readFile(filePath);
    } catch (error) {
      console.error(`Read error: ${error}`);
    }
  }

  // Перевіряє, чи існує файл або папка
  public static async exists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  // Отримує інформацію про файл
  public static async getInfo(filePath: string): Promise<void> {
    const info = await fs.stat(filePath);

    console.log("File size:", info.size);
    console.log("Is file:", info.isFile());
  }

  // Отримує список файлів у папці
  public static async getFiles(folderPath: string): Promise<string[]> {
    return await fs.readdir(folderPath);
  }

  // Створює копію файлу
  public static async copy(
    sourcePath: string,
    targetPath: string
  ): Promise<void> {
    await fs.copyFile(sourcePath, targetPath);
  }

  // Перейменовує або переміщує файл
  public static async rename(
    oldPath: string,
    newPath: string
  ): Promise<void> {
    await fs.rename(oldPath, newPath);
  }

  // Повертає повний реальний шлях до файлу
  public static async getRealPath(filePath: string): Promise<string> {
    return await fs.realpath(filePath);
  }

  // Скорочує файл до вказаної кількості байтів
  public static async truncate(
    filePath: string,
    length: number
  ): Promise<void> {
    await fs.truncate(filePath, length);
  }

  // Видаляє файл
  public static async deleteFile(filePath: string): Promise<void> {
    await fs.unlink(filePath);
  }

  // Створює тимчасову папку з унікальним ім'ям
  public static async createTempFolder(prefix: string): Promise<string> {
    return await fs.mkdtemp(prefix);
  }

  // Видаляє файл або папку
  public static async remove(targetPath: string): Promise<void> {
    await fs.rm(targetPath, {
      recursive: true,
      force: true,
    });
  }
}