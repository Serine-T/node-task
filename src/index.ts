const { readdir, stat } = require('fs/promises');
const { join } = require('path');

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
    console.error(`Catched Error: ${(e as Error).message}`);
  }
};

const folderName = process.argv[2];

if (!folderName) {
  console.error('Please enter the folder name.');
  process.exit(1);
}

const srcPath = join(__dirname, folderName);

dirNames(srcPath);
