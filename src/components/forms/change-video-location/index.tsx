"use client"

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { useMoveVideos } from '@/hooks/useFolders'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FolderIcon, ArrowRightIcon, MoveIcon } from 'lucide-react'

type Props = {
  videoId: string
  currentFolder?: string
  currentWorkSpace?: string
  currentFolderName?: string
}

const ChangeVideoLocation = ({
  videoId,
  currentFolder,
  currentFolderName,
  currentWorkSpace,
}: Props) => {
  const {
    register,
    isPending,
    onFormSubmit,
    folders,
    workspaces,
    isFetching,
    isFolders,
  } = useMoveVideos(videoId, currentWorkSpace!)

  const folder = folders.find((f) => f.id === currentFolder)
  const workspace = workspaces.find((f) => f.id === currentWorkSpace)

  return (
    <form
      className="space-y-6 max-w-md mx-auto p-4"
      onSubmit={onFormSubmit}
    >
      {/* Source Location */}
      <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-sm font-medium text-gray-200">
            <div className="flex items-center gap-2">
              <FolderIcon className="w-4 h-4 text-indigo-500" />
              Current Location
            </div>
          </CardTitle>
          <CardDescription className="text-xs text-gray-400">
            Current workspace and folder details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-gray-500">Workspace</Label>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-900/50 border border-gray-800">
              <FolderIcon className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">{workspace?.name || 'No workspace'}</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-gray-500">Folder</Label>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-900/50 border border-gray-800">
              <FolderIcon className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">{folder?.name || 'No folder'}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transition Arrow */}
      <div className="flex items-center gap-2 justify-center py-2">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
        <MoveIcon className="w-5 h-5 text-indigo-500 rotate-90" />
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      </div>

      {/* Destination */}
      <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-sm font-medium text-gray-200">
            <div className="flex items-center gap-2">
              <FolderIcon className="w-4 h-4 text-indigo-500" />
              New Location
            </div>
          </CardTitle>
          <CardDescription className="text-xs text-gray-400">
            Select destination workspace and folder
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-gray-500">Select Workspace</Label>
            <Select {...register('workspace_id')}>
              <SelectTrigger className="w-full bg-gray-900/50 border-gray-800">
                <SelectValue placeholder="Choose workspace..." />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-800">
                {workspaces.map((space) => (
                  <SelectItem
                    key={space.id}
                    value={space.id}
                    className="text-gray-300 hover:bg-gray-800"
                  >
                    {space.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isFetching ? (
            <Skeleton className="h-10 w-full bg-gray-800/50" />
          ) : (
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-gray-500">Select Folder</Label>
              {isFolders && isFolders.length > 0 ? (
                <select
                  {...register('folder_id')}
                  className="w-full p-2 rounded-lg bg-gray-900/50 border border-gray-800 text-gray-300 text-sm"
                >
                  {isFolders.map((folder) => (
                    <option key={folder.id} value={folder.id}>
                      {folder.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No folders available in this workspace
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Button */}
      <Button
        type="submit"
        disabled={isPending}
        className={cn(
          "w-full bg-indigo-600 hover:bg-indigo-700 text-white",
          "transition-all duration-200 ease-in-out",
          "flex items-center justify-center gap-2",
          isPending && "opacity-50 cursor-not-allowed"
        )}
      >
        {isPending ? (
          <>
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            <span>Transferring...</span>
          </>
        ) : (
          <>
            <MoveIcon className="w-4 h-4" />
            <span>Transfer Video</span>
          </>
        )}
      </Button>
    </form>
  )
}

export default ChangeVideoLocation