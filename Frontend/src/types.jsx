// @flow

export type DialogContainer = {
  isOpen: boolean,
  nodeId: string | null,
  containerId: string | null
}

export type BackupStatus = 'none' | 'running' | 'done'

export type BackupEntry = {
  nodeId: string,
  containerId: string,
  status: BackupStatus
}

export type BackupList = Array<BackupEntry>

export type BackupResult = {
  backupName: string,
  containerName: string,
  createdAt: Date,
  hostname: string
}

export type BackupResultDialog = {
  isOpen: boolean,
  backupResults: Array<BackupResult>
}
