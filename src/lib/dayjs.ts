import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

export const APP_TIME_ZONE = 'America/Fortaleza'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale(ptBR)

// Retorna o instante atual no fuso usado pelas regras civis do produto.
export const nowInAppTimeZone = () => dayjs().tz(APP_TIME_ZONE)

// Converte um instante UTC para o fuso usado na exibição do aplicativo.
export const toAppTimeZone = (value: string | Date | number) =>
	dayjs(value).tz(APP_TIME_ZONE)

// Interpreta uma data civil YYYY-MM-DD sem deslocá-la para outro dia.
export const toAppCivilDate = (value: string) => dayjs.tz(value, APP_TIME_ZONE)

export default dayjs
