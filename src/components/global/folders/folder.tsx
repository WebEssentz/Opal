'use client'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import Loader from '../loader'
import FolderDuotone from '@/components/icons/folder-duotone'
import { useMutationData, useMutationDataState } from '@/hooks/useMutationData'
import { deleteFolders, renameFolders } from '@/actions/workspace'
import { Input } from '@/components/ui/input'
import { useIsMobile } from '@/hooks/use-mobile'
import { useLongPress } from '@/hooks/use-long-press'
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { MoreVertical } from 'lucide-react'
import AnimatedTrash from '@/components/icons/animated-trash'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { FOLDERS } from '@/redux/slices/folders'

type Props = {
  name: string
  id: string
  optimistic?: boolean
  count?: number
}

const Folder = ({ id, name, optimistic, count }: Props) => {
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const folderCardRef = useRef<HTMLDivElement | null>(null)
  const pathName = usePathname()
  const router = useRouter()
  const isMobile = useIsMobile()
  const [onRename, setOnRename] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const Rename = () => setOnRename(true)
  const Renamed = () => setOnRename(false)

  const { mutate: renameMutate, isPending: isRenamePending } = useMutationData(
    ['rename-folders'],
    (data: { name: string }) => renameFolders(id, data.name),
    'workspace-folders',
    Renamed
  )

  const { mutate: deleteMutate, isPending: isDeletePending } = useMutationData(
    ['delete-folder'],
    () => deleteFolders(id),
    'workspace-folders',
    () => {
      setShowDeleteDialog(false)
      toast.success('Folder deleted successfully')
    }
  )

  const { latestVariables } = useMutationDataState(['rename-folders'])

  const handleFolderClick = () => {
    if (onRename) return
    router.push(`${pathName}/folder/${id}`)
  }

  const handleNameDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation()
    if (!isMobile) {
      Rename()
    }
  }

  const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      const newName = inputRef.current.value.trim();
      if (newName && newName !== name) {
        renameMutate({ name: newName, id })
      }
      Renamed()
    }
  }

  const handleDelete = () => {
    // Optimistic update
    dispatch({
      type: 'folders/FOLDERS',
      payload: {
        folders: []  // This will be updated by the query after mutation
      }
    })
    deleteMutate({ id })
  }

  const longPressProps = useLongPress({
    onLongPress: () => {
      if (isMobile) {
        Rename()
      }
    },
    ms: 600,
    disabled: !isMobile || onRename,
  })

  const getVideoText = (count: number | undefined) => {
    const videoCount = count || 0;
    return `${videoCount} ${videoCount === 1 ? 'video' : 'videos'}`;
  };

  return (
    <>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the folder
              and remove all videos within it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {isDeletePending ? (
                <Loader className="w-4 h-4" state={false} />
              ) : (
                'Delete Folder'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="group" onClick={handleFolderClick}>
        <div
          ref={folderCardRef}
          className={cn(
            optimistic && 'opacity-60',
            'flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between w-[250px] py-4 px-4 rounded-lg border-[1px] border-neutral-800'
          )}
          {...longPressProps}
        >
          <Loader state={isRenamePending}>
            <div className="flex flex-col gap-[1px] w-[200px] overflow-hidden">
              {onRename ? (
                <div className="w-full">
                  <Input
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      updateFolderName(e)
                    }}
                    autoFocus
                    defaultValue={name}
                    className="border-none text-base w-full outline-none text-neutral-300 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0 truncate"
                    ref={inputRef}
                  />
                </div>
              ) : (
                <p
                  onClick={(e) => e.stopPropagation()}
                  className="text-neutral-300 w-full truncate"
                  onDoubleClick={handleNameDoubleClick}
                >
                  { latestVariables &&
                    latestVariables.status === 'pending' &&
                    latestVariables.variables.id === id
                      ? latestVariables.variables.name
                      : name
                  }
                </p>
              )}
              <span className="text-sm text-neutral-500">{getVideoText(count)}</span>
            </div>
          </Loader>

          <div className="flex items-center gap-2">
            <FolderDuotone />
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <button className="rounded-full p-2 hover:bg-neutral-700/50 transition-colors opacity-0 group-hover:opacity-100">
                  <MoreVertical className="h-4 w-4 text-neutral-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                side="bottom"
                sideOffset={5}
                className="w-[160px] p-0 overflow-hidden"
              >
                <DropdownMenuItem 
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-red-500 hover:!text-red-200 focus:!text-red-200 hover:!bg-red-500/20 focus:!bg-red-500/20 cursor-pointer px-3 py-2 gap-3 transition-colors duration-200"
                >
                  <AnimatedTrash />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  )
}

export default Folder