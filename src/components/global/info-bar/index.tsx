import VideoRecorderIcon from '@/components/icons/video-recorder'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserButton } from '@clerk/nextjs'
import { Search, UploadIcon, Menu, X } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Props = {}

/*
      * There will be a sidebar toggle icon later ONLY ON DESKTOP AND WIDESCREEN EXCEPT MOBILE AND SMALL SCREENS.
      * That on click, the sidebar will be opened fully, or closed showing only logos and icons.
      * For the 'Updrage to Pro' when this update is done, on close, it will show and icon, a star icon that has a shiny fill color that twinkles.
      * WHATEVER YOU DO IT, SHOULD BE RESPONSIVE TO CALCULATE THE AMOUNT OF WIDTH USED BY THE APP, WHEN CLOSED OR OPEN.
      * ALSO, THE UI MUST NEVER BE FAR, IT SHOULD ALWAYS BE SLEEK, PROFESSIONAL, AND ENTERPRISE STANDARD, LIKE A GRADUATE FROM HAVARD.
*/

const InfoBar = (props: Props) => {
  const isMobile = useIsMobile()
  const [showSearch, setShowSearch] = React.useState(false)

  return (
    <header className={`fixed w-full p-4 flex items-center justify-between gap-4 backdrop-blur-sm ${isMobile ? 'pl-4' : 'pl-20 md:pl-[265px]'}`}>
      {isMobile ? (
        <AnimatePresence mode="wait" initial={false}>
          {showSearch ? (
            <motion.div 
              className="flex-1 flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] } }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              layout
            >
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <motion.div 
                className="flex-1 flex items-center gap-2 bg-muted/50 rounded-full px-3 py-1 overflow-hidden"
                initial={{ scaleX: 0.8, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0.8, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                layout
              >
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  className="bg-transparent border-none h-8 px-0 focus-visible:ring-0"
                  placeholder="Search..."
                  autoFocus
                />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setShowSearch(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              className="flex w-full justify-between"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20, transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] } }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              layout
            >
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <UserButton />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSearch(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <UploadIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <VideoRecorderIcon />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <>
          <div className="flex gap-4 justify-center items-center border-2 rounded-full px-4 w-full max-w-lg">
            <Search
              size={25}
              className="text-[#707070]"
            />
            <Input
              className="bg-transparent border-none !placeholder-neutral-500 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Search for people, projects, tags & folders"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button className="bg-[#9D9D9D] flex items-center gap-2">
              <UploadIcon size={20} />
              <span className="flex items-center gap-2">Upload</span>
            </Button>
            <Button className="bg-[#9D9D9D] flex items-center gap-2">
              <VideoRecorderIcon />
              <span className="flex items-center gap-2">Record</span>
            </Button>
            <UserButton />
          </div>
        </>
      )}
    </header>
  )
}

export default InfoBar