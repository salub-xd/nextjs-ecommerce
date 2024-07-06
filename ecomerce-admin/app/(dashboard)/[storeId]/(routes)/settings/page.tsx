import React from 'react'
import { SettingsForm } from './components/settings-form';
import prismadb from '@/lib/prismadb';
import { redirect } from 'next/navigation';

const SettingsPage = async ({ params }: { params: { storeId: string } }) => {

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  });

  if (!store) {
    redirect('/');
  }

  return (
    <div className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SettingsForm initialData={store} />
      </div>
    </div>
  )
}

export default SettingsPage;
