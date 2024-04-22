import type { VirtualFile } from './visual-file'

export interface VirtualFileSystemTree {
  [name: string]: VirtualDirectoryNode | VirtualFileNode
}

export interface VirtualDirectoryNode {
  directory: VirtualFileSystemTree
}

export interface VirtualFileNode {
  file: VirtualFile
}