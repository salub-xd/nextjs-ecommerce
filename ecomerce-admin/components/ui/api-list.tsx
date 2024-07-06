import React from 'react';
import { ApiAlert } from './api-alert';
import { useOrigin } from '@/hooks/use-origin';
import { useParams } from 'next/navigation';

interface ApiAlertProps {
    entityName:string;
    entityIdName:string;

}

const ApiList:React.FC<ApiAlertProps> = ({
    entityName,
    entityIdName,
}) => {

    const origin = useOrigin();
    const params = useParams();
    const baseUrl = `${origin}/api/${params.storeId}/${entityName}`

  return (
    <>
      <ApiAlert
      title='GET'
      description={`${baseUrl}`}
      variant='public'
      />
      <ApiAlert
      title='GET'
      description={`${baseUrl}/{${entityIdName}}`}
      variant='public'
      />
      <ApiAlert
      title='POST'
      description={`${baseUrl}`}
      variant='admin'
      />
      <ApiAlert
      title='PATCH'
      description={`${baseUrl}/{${entityIdName}}`}
      variant='admin'
      />
      <ApiAlert
      title='DELETE'
      description={`${baseUrl}/{${entityIdName}}`}
      variant='admin'
      />
    </>
  )
}

export default ApiList;
