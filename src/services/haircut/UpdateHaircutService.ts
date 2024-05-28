import prismaClient from "../../prisma";

interface HaircutRequest{
    user_id: string
    haircut_id: string
    name: string
    price: number
    status: string | boolean
}

class UpdateHaircutService{
    async execute({user_id, name, price, haircut_id, status = true}: HaircutRequest){

        const user = await prismaClient.user.findFirst({
            where:{
                id: user_id
            },
            include:{
                subscriptions: true
            }
        })

        if(user?.subscriptions?.status !== 'active'){
            throw new Error ("NÃO AUTORIZADO")
        }

        const haircut = await prismaClient.haircut.update({
            where:{
                id: haircut_id
            },
            data:{
                name: name,
                price: price,
                status: status === true ? true : false
            }
        })

        return haircut

    }
}

export { UpdateHaircutService }