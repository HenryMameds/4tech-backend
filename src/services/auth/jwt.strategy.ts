import {Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

// NUNCA DEVE SER EXPOSTA PUBLICAMENTE
//
// A CHAVE SECREAT SÓ ESTA A MOSTRA A FINS DE DEIXAR CLARO O QUE
// O CÓDIGO ESTÁ FAZENDO. EM UM AMBIENTE DE PRODUÇÃO, A CHAVE
// DEVE ESTAR PROTEGIDA POR MEDIDAS APROPRIADAS (COMO POR EXEMPLO
//SECRET VAULTS, VARIAVEIS DE AMBIENTE OU SERVIÇOS DE CONFIGURAÇÃO)

export const secretKey = 'wingardium leviosa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor() {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        igonreExpiration: false,
        secretOrKey: secretKey,
      })
    }

    async validate(payload: any){
      return { userLogin:  payload.userLogin };
    }
}
