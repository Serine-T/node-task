import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const dirNames = async (dirPath: string, level: number = 0): Promise<void> => {
  try {
    const items = await readdir(dirPath);
    
    for (const item of items) {
      const fullPath = join(dirPath, item);
      const stats = await stat(fullPath);
      
      console.log(`${'|  '.repeat(level)}${item}`);
      
      if (stats.isDirectory()) {
        await dirNames(fullPath, level + 1);
      }
    }
  } catch (e) {
    console.error(e);  }
}

const srcPath = __dirname;

dirNames(srcPath);
