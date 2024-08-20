import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const dirNames=  async  (dirPath: string, level: number = 0): Promise<void> => {
  try {
    const items = await readdir(dirPath);
    
    for (const item of items) {
      // console.log('dirPath', dirPath);
      const fullPath = join(dirPath, item);
      const stats = await stat(fullPath);
      
      // console.log(`${stats.isDirectory() ? '' : '  '} ${item}`);
      
      if (stats.isDirectory()) {
        await dirNames(fullPath, level + 1);
      }
    }
  } catch (e) {
    console.error(e);
  }
}


const startPath = process.argv[1];
console.log('process.argv', process.argv[1])
console.log('startPath', startPath)

dirNames(startPath);
