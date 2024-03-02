'use client'
import { AuthUser } from '@supabase/supabase-js'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Subscription } from '@/lib/supabase/supabase.types';
import EmojiPicker from '../global/emoji-picker';
interface DashboardSetupProps {
  user: AuthUser;
  subscription: Subscription | null;
}

const DashboardSetup: React.FC <DashboardSetupProps> = ({subscription, user}) => {
  const [selectedEmoji, setSelectedEmoji] = useState('')
  return (
  <Card className='w-[800px] h-screen sm:h-auto'>
    <CardHeader>
      <CardTitle>
        Create a Workspace
        <CardDescription>

        </CardDescription>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <form onSubmit={()=> {}} >
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-4'>
            <div className='text-5xl'>
            <EmojiPicker getValue={(emoji) => setSelectedEmoji(emoji)}>
                  {selectedEmoji}
                </EmojiPicker>
            </div>
          </div>
        </div>
      </form>
    </CardContent>
  </Card>
    )
  }
export default DashboardSetup