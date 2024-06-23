import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient()
async function main() {
  await prisma.user.create({
                        data:{
                            email: 'alice@prisma.io',
                            name: 'Alice',
                            password:hashSync('123456', 10)
                        }
                    })
 
}
main()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    await prisma.$disconnect()
    process.exit(1)
})