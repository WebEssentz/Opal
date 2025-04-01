'use client'
import { getFolderInfo } from '@/actions/workspace'
import { useQueryData } from '@/hooks/useQueryData'
import React from 'react'
import { FolderProps } from '@/types/index.type'

type Props = {
  folderId: string
}

const FolderInfo = ({ folderId }: Props) => {
  const { data, isFetching } = useQueryData(['folder-info'], () => getFolderInfo(folderId))
  const folderData = data as FolderProps | undefined

  if (isFetching) {
    return (
      <div className="flex items-center">
        <h2 className="text[#BdBdBd] text-2xl">Loading...</h2>
      </div>
    )
  }

  if (!folderData?.data) {
    return (
      <div className="flex items-center">
        <h2 className="text[#BdBdBd] text-2xl">Folder not found</h2>
      </div>
    )
  }

  return (
    <div className="flex items-center">
      <h2 className="text[#BdBdBd] text-2xl">{folderData.data.name}</h2>
    </div>
  )
}

export default FolderInfo