"use client"
import FolderDuotone from '@/components/icons/folder-duotone'
import React from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Folder from './folder'
import { useQueryData } from '@/hooks/useQueryData'
import { getWorkspaceFolders } from '@/actions/workspace'
import { useMutationDataState } from '@/hooks/useMutationData'
import { useDispatch } from 'react-redux'
import { FOLDERS } from '@/redux/slices/folders'

type Props = {
  workspaceId: string
}

export type FoldersProps = {
  status: number
  data: ({
    _count: {
      videos: number
    }
  } & {
    id: string
    name: string
    createdAt: Date
    workSpaceId: string | null
  })[]
}

const Folders = ({ workspaceId }: Props) => {
  const dispatch = useDispatch()

  const { data, isFetched } = useQueryData(
    ['workspace-folders'],
    () => getWorkspaceFolders(workspaceId),
  )

  const { latestVariables } = useMutationDataState(['create-folder'])

  const { data: folders, status } = data as FoldersProps

  if (isFetched && folders) {
    dispatch(FOLDERS({ folders: folders }))
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <FolderDuotone />
          <h2 className='text-[#BDBDBD] text-xl'>Folders</h2>
        </div>
        <div className='flex items-center gap-2'>
          <p className='text-[#BDBDBD] text-sm'>See all</p>
          <ArrowRight color="#707070"/>
        </div>
      </div>
      <section 
        className={cn(
          status !== 200 && 'justify-center',
          'flex items-center gap-4 overflow-x-auto w-full custom-scrollbar pb-2'
        )}
      >
        {status === 200 ? (
          <>
           {latestVariables && latestVariables.status === 'pending' && (
            <Folder
              name={latestVariables.variables.name}
              id={latestVariables.variables.id}
              optimistic
            />
           )}
           {folders.map((folder) => (
            <Folder
              name={folder.name}
              count={folder._count.videos}
              id={folder.id}
              key={folder.id}
            />
          ))}
          </>
        ) : (
          <p className='text-neutral-300'>No folders in workspace</p> 
        )}
      </section>
    </div>
  )
}

export default Folders