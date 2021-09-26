import {mkdir} from 'fs/promises';
import { dirname } from 'path';

export async function createNecessaryFolders (filepath: string) {
    const folders = dirname(filepath);
    await mkdir(folders, { recursive: true });
}
