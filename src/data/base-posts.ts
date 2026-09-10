import { postHipermidia } from "@/data/posts/hipermidia";
import { postMidia } from "@/data/posts/midia";
import { postMultimidia } from "@/data/posts/multimidia";
import { postRealidadeAumentada } from "@/data/posts/realidade-aumentada";
import { postRealidadeMista } from "@/data/posts/realidade-mista";
import { postRealidadeVirtual } from "@/data/posts/realidade-virtual";
import type { Post } from "@/types/post";

export const basePosts: Post[] = [
  postRealidadeMista,
  postRealidadeVirtual,
  postRealidadeAumentada,
  postMidia,
  postMultimidia,
  postHipermidia,
];
