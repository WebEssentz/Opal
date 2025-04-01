import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import React from 'react'

type Props = {
  trigger: React.ReactNode
  children: React.ReactNode
  title: string
  description: string
  className?: string
}

const Modal = ({ children, title, description, className, trigger }: Props) => {
  return (
    <Dialog>
      <DialogTrigger
       className={className}
       asChild
      >
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Modal