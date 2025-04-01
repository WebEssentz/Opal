"use client"

import FormGenerator from '@/components/global/form-generator'
import { Button } from '@/components/ui/button'
import { useCreateWorkspace } from '@/hooks/useCreateWorkspace'
import { FolderPlus, Loader2 } from 'lucide-react'

const WorkspaceForm = () => {
  const { errors, isPending, onFormSubmit, register } = useCreateWorkspace()
  
  return (
    <form
      onSubmit={onFormSubmit}
      className="space-y-4"
    >
      <FormGenerator
        register={register}
        name="name"
        placeholder="Enter workspace name"
        label="Workspace Name"
        errors={errors}
        inputType="input"
        type="text"
      />

      <Button
        type="submit"
        disabled={isPending}
        className="w-full"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating...
          </>
        ) : (
          <>
            <FolderPlus className="mr-2 h-4 w-4" />
            Create Workspace
          </>
        )}
      </Button>
    </form>
  )
}

export default WorkspaceForm