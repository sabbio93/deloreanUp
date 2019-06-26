// @flow

export type DialogContainer = {
  isOpen: boolean,
  nodeId: string | null,
  containerId: string | null
}

export type BackupStatus = 'none' | 'running' | 'done'

export type BackupList = Array<BackupEntry>

export type BackupEntry = {
  nodeId: string,
  containerId: string,
  status: BackupStatus
}
