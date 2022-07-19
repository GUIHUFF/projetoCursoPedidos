import prismaClient from "../../prisma";
import { compare } from 'bcryptjs';

interface AuthResquest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthResquest) {
    //verificar se recebeu um email
    if (!email) {
      throw new Error("Email incorrect");
    }
    //verificar se recebeu uma senha
    if (!password) {
      throw new Error("Password incorrect");
    }

    //Verificar se o email existe
    const user = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    });

    if (!user) {
      throw new Error("User/Password incorrect");
    }

    //Verificar se está correta a senha
    const passwordMath = await compare(password, user.password);

    if (!passwordMath) {
      throw new Error("User/Password incorrect");
    }

    //Gerar um token JWT e devolver dados do usuário

    return {ok: true}
  }
}

export { AuthUserService }