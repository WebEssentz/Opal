import { getNotifications } from '@/actions/user'
import {
  getAllUserVideos,
  getWorkspaceFolders,
  getWorkSpaces,
} from '@/actions/workspace'
import CreateFolders from '@/components/global/create-folders'
import CreateWorkspace from '@/components/global/create-workspace'
import Folders from '@/components/global/folders'
import Videos from '@/components/global/videos'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import React from 'react'

type Props = {
  params: { workspaceId: string }
}

const Page = async ({ params: { workspaceId } }: Props) => {
  const query = new QueryClient()

  await query.prefetchQuery({
    queryKey: ['workspace-folders'],
    queryFn: () => getWorkspaceFolders(workspaceId),
  })

  await query.prefetchQuery({
    queryKey: ['user-videos'],
    queryFn: () => getAllUserVideos(workspaceId),
  })

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div>
        <Tabs
          defaultValue="videos"
          className="mt-8"
        >
          <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center gap-5 mb-2">
            <TabsList className="bg-transparent gap-2 pl-0 grid grid-cols-2 w-full md:w-auto md:flex">
              <TabsTrigger
                className="p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525] text-center w-full md:w-auto"
                value="videos"
              >
                Videos
              </TabsTrigger>
              <TabsTrigger
                value="archive"
                className="p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525] text-center w-full md:w-auto"
              >
                Archive
              </TabsTrigger>
            </TabsList>
            <div className="grid grid-cols-2 md:flex gap-2 w-full md:w-auto">
              <CreateWorkspace />
              <CreateFolders workspaceId={workspaceId} />
            </div>
          </div>
          <section className="py-9">
            <TabsContent value="videos">
              <Folders workspaceId={workspaceId} />
              <div className="mt-8">
                <Videos workspaceId={workspaceId} videosKey="user-videos" folderId={workspaceId} />
              </div>
            </TabsContent>
            <TabsContent value="archive">
              {/* Archive content */}
            </TabsContent>
          </section>
        </Tabs>
      </div>
    </HydrationBoundary>
  )
}

export default Page