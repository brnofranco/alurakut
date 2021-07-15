import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if(request.method === 'POST') {
        const TOKEN = 'df9e1ea1c7d3362aa57e49fb6738c8';
        const client = new SiteClient(TOKEN);
        
        const createdRegister = await client.items.create({
            itemType: "967705", // ID do Model de "Communities" criado pelo Dato
            ...request.body,
        })
    
        console.log(createdRegister);
    
        response.json({
            createdRegister: createdRegister,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}