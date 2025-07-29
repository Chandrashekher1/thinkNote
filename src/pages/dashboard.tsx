import {  useState } from 'react'
import '../App.css'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { CreateContentModal } from '../components/ui/CreateContentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../components/ui/Sidebar'
import { useContent } from '@/Hook/useContent'

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(true)

  const content = useContent()
  console.log(content);

  return (
    <div className=''>
      <div>
        <Sidebar/>
      </div>
      <div className='p-4 ml-72 min-h-screen bg-gray-100'>
        <CreateContentModal open={modalOpen} onClose={() => {setModalOpen(false)}} />
        <div className='flex justify-end gap-4'>
          <Button variant='primary'  startIcon={<ShareIcon size='sm'/>} text='Share brain' size='md'  />
          <div >
              <Button variant='secondary' startIcon={<PlusIcon size='md'/>} size='md' text='Add content' onClick={() => setModalOpen(true)} />
          </div>
        </div>
        <div className='flex gap-4 mx-4 ' >
          {
            content.map((content,index) => (
              <div key={index}>
                  <Card title={content?.title} link={content?.link} type={content.type}  />
              </div>
            ))
          }

        </div>
      </div>
    </div>
  )
}

export default Dashboard
