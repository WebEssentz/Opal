'use client'
import React from 'react'
import Loader from '../loader'
import CardMenu from './video-card-menu'
import CopyLink from './copy-link'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dot, Share2, User } from 'lucide-react'

type Props = {
  User: {
    firstname: string | null
    lastname: string | null
    image: string | null
  } | null
  id: string
  Folder: {
    id: string
    name: string
  } | null
  createdAt: Date
  title: string | null
  source: string
  processing: boolean
  workspaceId: string
}

const VideoCard = (props: Props) => {
  /*
  *  WIP: Change this days ago such that, 1-6 days is 1 day ago, etc
  *  A new video if just created is labelled 'Today', then anything else such as 7 days will be 'a week ago', 14, '2 weeks ago'
  *  31 days or 30 days depending on the month "A month ago", "2 months ago",
  *  If very old "1 year ago", Or state the year like if this is 2024 and the video was created 2023, it will be like "2023" instead of "1 year ago"
  */
  const daysAgo = Math.floor(
    (new Date().getTime() - props.createdAt.getTime()) / (24 * 60 * 60 * 1000)
  )

  return (
    <Loader
      className="bg-[#171717] flex justify-center items-center border-[1px] border-[rgb(37,37,37)] rounded-xl"
      state={false}
    >
      <div className="group overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl">
        <div className="absolute top-3 right-3 z-50 gap-x-3 hidden group-hover:flex">
          <CardMenu
            currentFolderName={props.Folder?.name}
            videoId={props.id}
            currentWorkspace={props.workspaceId}
            currentFolder={props.Folder?.id}
          />
          <CopyLink
            className="p-[5px] h-5 bg-hover:bg-transparent bg-[#252525]"
            videoId={props.id}
          />
        </div>
        <Link
          href={`/dashboard/${props.workspaceId}/video/${props.id}`}
          className="hover:bg-[#252525] transition duration-150 flex flex-col justify-between h-full"
        >
          <video
            controls={false}
            preload="metadata"
            className="w-full aspect-video opacity-50 z-20"
          >
            <source
              src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${props.source}#t=1`}
            />
          </video>
          <div className="px-5 py-3 flex flex-col gap-7-2 z-20">
            <h2 className="text-sm font-semibold text-[#BDBDBD]">
              {props.title}
            </h2>
            <div className="flex gap-x-2 items-center mt-4">
              <Avatar className=" w-8 h-8">
                <AvatarImage src={props.User?.image as string} className="object-cover" />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="capitalize text-xs text-[#BDBDBD]">
                  {props.User?.firstname} {props.User?.lastname}
                </p>
                <p className="text-[#6d6b6b]  text-xs flex items-center ">
                  {/* WIP, IF A VIDEO HAS A DAYS AGO OF 1, IT SHOULD BE 1DAY GO. WHILE 2 UPWARDS SHOULD BE DAYS NOT DAY. ALSO FOLLOW MY NOMENCLATURE */}
                  <Dot /> {daysAgo === 0 ? 'Today' : `${daysAgo}d ago`}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <span className="flex gap-x-1 items-center">
                <Share2
                  fill="#9D9D9D"
                  className="text-[#9D9D9D]"
                  size={12}
                />
                <p className="text-xs text-[#9D9D9D] capitalize">
                  {props.User?.firstname}&apos;s Workspace
                </p>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </Loader>
  )
}

export default VideoCard