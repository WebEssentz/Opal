'use client'
import { getWorkSpaces } from '@/actions/workspace'
import React from 'react'
import Modal from '../modal'
import { Button } from '@/components/ui/button'
import { useQueryData } from '@/hooks/useQueryData'
import FolderPlusDuotine from '@/components/icons/folder-plus-duotone'
import WorkspaceForm from '@/components/forms/workspace-form'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type Props = {}

const CreateWorkspace = (props: Props) => {
  const { data } = useQueryData(['user-workspaces'], getWorkSpaces)

  const { data: plan } = data as {
    status: number
    data: {
      subscription: {
        plan: 'PRO' | 'FREE'
      } | null
    }
  }

  if (plan.subscription?.plan === 'FREE') {
    return (
      <AlertDialog>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <AlertDialogTrigger asChild>
                <Button className="bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl relative">
                  <FolderPlusDuotine />
                  Create Workspace
                  <span className="absolute -top-2 -right-2 bg-[#00ffff] text-black text-xs px-2 py-0.5 rounded-full font-medium">
                    PRO
                  </span>
                </Button>
              </AlertDialogTrigger>
            </TooltipTrigger>
            <TooltipContent className="bg-neutral-800 text-white">
              <p>Available for Pro users</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <AlertDialogContent className="bg-[#1D1D1D] border-neutral-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Upgrade to Pro</AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-400">
              Create unlimited workspaces and collaborate with your team members. Upgrade to Pro to unlock all features.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-neutral-800 text-white hover:bg-neutral-700">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-sky-500 text-white hover:bg-[#00ffff]">Upgrade to Pro</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  if (plan.subscription?.plan === 'PRO')
    return (
      <Modal
        title="Create a Workspace"
        description="Workspaces helps you collaborate with team members. You are assigned a default personal workspace where you can share videos in private with yourself."
        trigger={
          <Button className="bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl">
            <FolderPlusDuotine />
            Create Workspace
          </Button>
        }
      >
        <WorkspaceForm />
      </Modal>
    )
}

export default CreateWorkspace