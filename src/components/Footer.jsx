import { Link } from "react-router-dom";

import { Box, Text } from "@chakra-ui/react";
import {
  FaTelegram,
  FaTiktok,
  FaYoutube,
  FaRegCalendarCheck,
  FaLandmark,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { TbBrandWhatsapp } from "react-icons/tb";
import { IoMdInformationCircle } from "react-icons/io";

export default function Footer() {
  return (
    <Box className="flex w-full flex-col items-center justify-center gap-2 bg-gray-200 pb-4 pt-8 md:gap-6">
      <Box className="mx-auto w-full gap-8 md:flex md:items-start md:justify-center lg:max-w-7xl">
        <Box className="p-4 md:w-[33.33%]">
          <Text className="mb-4 flex items-center justify-start gap-2 text-large font-bold text-primary-600">
            <FaLandmark />
            Neo Traders
          </Text>
          <Text className="mb-2 text-base text-primary-600">
            Neo Traders Tecnologia e treinamento CNPJ: 36.121.207/0001-61
          </Text>
          <Text className="mb-4 text-base text-primary-600">
            Av. José de Souza Campos, 550 – 4º andar Cep. 13092-123 – Nova
            Campinas, Campinas – SP.
          </Text>
          <Box className="flex items-center justify-start gap-7 text-normal text-primary-600">
            <Link
              to="https://www.instagram.com/leononatotrader/"
              className="rounded-md bg-gray-150 p-[6px]"
            >
              <BsInstagram size={16} />
            </Link>

            <Link
              to="https://www.youtube.com/LeoNonatoTraderOficial"
              className="rounded-md bg-gray-150 p-[6px]"
            >
              <FaYoutube size={16} />
            </Link>

            <Link
              to="https://www.tiktok.com/@leononatotrader/"
              className="rounded-md bg-gray-150 p-[6px]"
            >
              <FaTiktok size={16} />
            </Link>

            <Link
              to="https://t.me/leononatotrader"
              className="rounded-md bg-gray-150 p-[6px]"
            >
              <FaTelegram size={16} />
            </Link>
            <Link
              to="https://twitter.com/leononatotrader"
              className="rounded-md bg-gray-150 p-[6px]"
            >
              <FaXTwitter size={16} />
            </Link>
          </Box>
        </Box>
        <Box className="p-4 md:w-[33.33%]">
          <Text className="mb-4 flex items-center justify-start gap-2 text-large font-bold text-primary-600">
            <FaRegCalendarCheck />
            Cancelamento
          </Text>
          <Text className="mb-2 text-base text-primary-600">
            O cancelamento de cursos ou mentorias efetuados após o período de 7
            dias corridos desobriga a Neo Traders a efetuar reembolsos.
          </Text>
          <Text className="mb-2 text-base text-primary-600">
            Lembre-se de que a mentoria individual é uma reserva de agenda e o
            prazo para solicitar cancelamentos é de no máximo 7 dias corridos
            após a compra.
          </Text>
          <Text className="mb-2 text-base text-primary-600">
            Inadimplentes por 30 dias terão o serviço suspenso e com 45 dias
            inadimplente a prestação do serviço será encerra sem aviso prévio.
          </Text>
        </Box>
        <Box className="p-4 md:w-[33.33%]">
          <Text className="mb-4 flex items-center justify-start gap-2 text-large font-bold text-primary-600">
            <IoMdInformationCircle />
            Informações
          </Text>
          <Text className="mb-2 text-base text-primary-600">
            Para mais informações, acesse:
          </Text>
          <Text className="mb-2 text-base text-primary-600">
            <Link
              to={"https://chat.whatsapp.com/GZYfTsSYARf9diFa8eB3aN"}
              target="_blank"
              className="flex items-center justify-start gap-2"
            >
              <TbBrandWhatsapp />
              Fale pelo Whatsapp
            </Link>
          </Text>
          <Text className="mb-2 text-base text-primary-600" target="_blank">
            <Link
              to={"mailto:meajuda@leononato.com"}
              className="flex items-center justify-start gap-2"
            >
              <MdOutlineMail />
              Email: meajuda@leononato.com
            </Link>
          </Text>
        </Box>
      </Box>

      <Box className="flex flex-col items-center justify-center p-4 text-primary-600 lg:max-w-7xl">
        <Text className="mb-[10px] font-inter text-small leading-4 lg:mb-0">
          DISCLAIMER: NEOTRADERS INFORMA, RETORNOS PASSADOS NÃO SÃO GARANTIA DE
          RETORNO FUTURO. INVESTIMENTOS ENVOLVEM RISCOS E PODEM CAUSAR PERDAS AO
          INVESTIDOR. AS ESTRATÉGIAS COM ATIVOS E DERIVATIVOS ENVOLVEM RISCOS E
          PODEM TRAZER PERDAS SUPERIORES AO CAPITAL INVESTIDO. OS RESULTADOS
          PODEM VARIAR DE PESSOA PARA PESSOA. NUNCA INVISTA OU ESPECULE COM
          RECURSOS DESTINADOS A DESPESAS IMEDIATAS OU DE EMERGÊNCIA. NÓS
          RECOMENDAMOS QUE ESTUDE SOMENTE NO MODO SIMULADOR ATÉ QUE TENHA
          EXPERIENCIA REAL DO QUE ESTÁ FAZENDO. É ALTAMENTE RECOMENDADO TAMBÉM
          QUE VOCÊ CONHEÇA SEU PERFIL DE INVESTIDOR. EM NENHUM MOMENTO
          RECOMENDAMOS COMPRA OU VENDA DE VALORES MOBILIÁRIOS.
        </Text>
      </Box>

      <Box className="flex flex-col items-center justify-center text-primary-600">
        <Text className="mb-[10px] font-inter text-small leading-4 lg:mb-0">
          Neo Traders ©️ Copyright 2023, Todos Direitos Reservados
        </Text>
      </Box>
    </Box>
  );
}
