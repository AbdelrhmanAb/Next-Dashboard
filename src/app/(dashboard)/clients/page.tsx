import ClientsTable from '@/components/clients/clientsTable';
import OverViewClients from '@/components/overView/overViewClients';
import React from 'react'

const ClientPage = () => {
    return (
        <div className="w-full flex flex-col p-10 gap-10">
            <OverViewClients />
            <ClientsTable/>

        </div>
    )
}

export default ClientPage