'use client'
import { getWorkSpaces } from '@/actions/workspace'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

import { NotificationsProps, WorkspaceProps } from '@/types/index.type'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import Modal from '../modal'
import { Menu, PlusCircle } from 'lucide-react'
import Search from '../search'
import { MENU_ITEMS } from '@/constants'
import SidebarItem from './sidebar-item'
import { getNotifications } from '@/actions/user'
import { useQueryData } from '@/hooks/useQueryData'
import WorkspacePlaceholder from './workspace-placeholder'
import GlobalCard from '../global-card'
import Loader from '../loader'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import InfoBar from '../info-bar'
import { WORKSPACES } from '@/redux/slices/workspaces'
import { useDispatch } from 'react-redux'

type Props = {
  activeWorkspaceId: string
}

const Sidebar = ({ activeWorkspaceId }: Props) => {

  const router = useRouter()
  const pathName = usePathname()
  const dispatch = useDispatch()

  const { data, isFetched } = useQueryData(['user-workspaces'], getWorkSpaces)
  const menuItems = MENU_ITEMS(activeWorkspaceId)

  const { data: notifications } = useQueryData(
    ['user-notifications'],
    getNotifications
  )

  const { data: workspace } = data as WorkspaceProps
  const { data: count } = notifications as NotificationsProps

  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`)
  }
  const currentWorkspace = workspace.workspace.find(
    (s) => s.id === activeWorkspaceId
  )

  if (isFetched && workspace) {
    dispatch(WORKSPACES({
      workspaces: workspace.workspace
    }))
  }

  const SidebarSection = (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0 ">
        <Image
          src="/opal-logo.svg"
          height={40}
          width={40}
          alt="logo"
        />
        <p className="text-2xl">Opal</p>
      </div>
      <Select
        defaultValue={activeWorkspaceId}
        onValueChange={onChangeActiveWorkspace}
      >
        <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
          <SelectValue placeholder="Select a workspace"></SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-[#111111] backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel>Workspaces</SelectLabel>
            <Separator />
            {workspace.workspace.map((workspace) => (
              <SelectItem
                value={workspace.id}
                key={workspace.id}
              >
                {workspace.name}
              </SelectItem>
            ))}
            {workspace.members.length > 0 &&
              workspace.members.map(
                (workspace) =>
                  workspace.Workspace && (
                    <SelectItem
                      value={workspace.Workspace.id}
                      key={workspace.Workspace.id}
                    >
                      {workspace.Workspace.name}
                    </SelectItem>
                  )
              )}
          </SelectGroup>
        </SelectContent>
      </Select>
      {currentWorkspace?.type === 'PUBLIC' &&
        workspace.subscription?.plan == 'PRO' && (
          <Modal
            trigger={
              <span className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90  hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2">
                <PlusCircle
                  size={15}
                  className="text-neutral-800/90 fill-neutral-500"
                />
                <span className="text-neutral-400 font-semibold text-xs">
                  Invite To Workspace
                </span>
              </span>
            }
            title="Invite Members"
            description="Add people to your workspace"
          >
            <Search workspaceId={activeWorkspaceId} />
          </Modal>
        )}
      <p className="w-full text-[#9D9D9D] font-bold mt-4">Menu</p>
      <nav className="w-full">
        <ul>
          {menuItems.map((item) => (
            <SidebarItem
              href={item.href}
              icon={item.icon}
              selected={pathName === item.href}
              title={item.title}
              key={item.title}
              notifications={
                (item.title === 'Notifications' &&
                  count._count &&
                  count._count.notification) ||
                0
              }
            />
          ))}
        </ul>
      </nav>
      <Separator className="w-4/5" />
      <p className="w-full text-[#9D9D9D] font-bold mt-4">Workspaces</p>

      {workspace.workspace.length === 1 && workspace.members.length === 0 && (
        <div className="w-full mt-[-10px]">
          <p className="text-[#3c3c3c] font-medium text-sm">
            {workspace.subscription?.plan === 'FREE'
              ? 'Upgrade to unlock workspaces'
              : 'No Workspaces'}
          </p>
        </div>
      )}

      <nav className="w-full">
        <ul className="h-[150px] overflow-auto overflow-x-hidden custom-scrollbar fade-layer pr-2">
          {workspace.workspace.length > 0 &&
            workspace.workspace.map(
              (item) =>
                item.type !== 'PERSONAL' && (
                  <SidebarItem
                    href={`/dashboard/${item.id}`}
                    selected={pathName === `/dashboard/${item.id}`}
                    title={item.name}
                    notifications={0}
                    key={item.name}
                    icon={
                      <WorkspacePlaceholder>
                        {item.name.charAt(0)}
                      </WorkspacePlaceholder>
                    }
                  />
                )
            )}
          {workspace.members.length > 0 &&
            workspace.members.map((item) => (
              <SidebarItem
                href={`/dashboard/${item.Workspace.id}`}
                selected={pathName === `/dashboard/${item.Workspace.id}`}
                title={item.Workspace.name}
                notifications={0}
                key={item.Workspace.name}
                icon={
                  <WorkspacePlaceholder>
                    {item.Workspace.name.charAt(0)}
                  </WorkspacePlaceholder>
                }
              />
            ))}
        </ul>
      </nav>

      <Separator className="w-4/5" />

      {/** 
       * WIP: LISTEN CAREFULLY, ANYTHING USED MUST BE ENTERPRISE STANDARD, SLEEK, PROFESSIONAL, AND MUST NOT GO AWAY FROM THE OVERALL LAYOUT OF THE WEBSITE
       * Update this section. It should be finer like the 'Upgrade to Pro' text
       * The Pro in the text should has a different color that is eye catchy
       * Then the button, should be rounded, and have a fill color that is the same color of the Pro, the only difference is that it is a gradient here.
       * The animation for that border should be like this, a circuit. The color is the current, the circuit is the complete button border, the current, that is the color moves round, the border, that is the circuit constantly, making it subtle glow that blends professionally with the overall design
       * NOTE, Whatever color used, should blend, and not be so unattractive, especially the gradient part.
       * Also, do one fancy animation when the user clicks on Upgrade, and the loader can be finer and more sleek than that.
       */}
      {workspace.subscription?.plan === 'FREE' && (
        <GlobalCard
          title="Upgrade to Pro"
          description="Unlock AI features like transcription, AI summary, and more."
          footer={
            <Button className="text-sm w-full">
              <Loader color='#000' state={false}>Upgrade</Loader>
            </Button>
          }
        />
      )}
      {/**
       * Maybe we should push it up a little, so that below the upgrade banner, we will have the user's account.
       * The logo of the user, name up a bit in bold, then below almost immediately, the user gmail, but if too long use '...' for example: 'andrespedriony...'
       * Then beside it by the right end, will be a dropdown icon. On click will open something, which I don't know for now.
       */}
    </div>
  )
  return (
    <div className="full">
      <InfoBar />
      <div className="md:hidden fixed my-4">
        <Sheet>
          <SheetTrigger
            asChild
            className="ml-2"
          >
            <Button
              variant={'ghost'}
              className="mt-[2px]"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent
            side={'left'}
            className="p-0 w-fit h-full"
          >
            {SidebarSection}
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block hidden h-full">{SidebarSection}</div>
    </div>
  )
}

export default Sidebar