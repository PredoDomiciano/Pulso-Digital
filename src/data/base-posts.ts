import { postDestinoDaImagem } from "@/data/posts/destino-da-imagem";
import { postFundamentosDaImagem } from "@/data/posts/fundamentos-da-imagem";
import { postGrandmasterAlchemist } from "@/data/posts/grandmaster-alchemist";
import { postHipermidia } from "@/data/posts/hipermidia";
import { postMidia } from "@/data/posts/midia";
import { postMinaProcedural } from "@/data/posts/mina-procedural";
import { postMultimidia } from "@/data/posts/multimidia";
import { postRealidadeAumentada } from "@/data/posts/realidade-aumentada";
import { postRealidadeMista } from "@/data/posts/realidade-mista";
import { postRealidadeVirtual } from "@/data/posts/realidade-virtual";
import type { Post } from "@/types/post";

export const basePosts: Post[] = [
  postMinaProcedural,
  postGrandmasterAlchemist,
  postDestinoDaImagem,
  postFundamentosDaImagem,
  postRealidadeMista,
  postRealidadeVirtual,
  postRealidadeAumentada,
  postMidia,
  postMultimidia,
  postHipermidia,
];
