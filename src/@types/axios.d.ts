import 'axios'

declare module 'axios' {
	// Impede que falhas de endpoints públicos tentem renovar uma sessão inexistente.
	export interface AxiosRequestConfig {
		_retry?: boolean
		skipAuthRefresh?: boolean
	}
}
