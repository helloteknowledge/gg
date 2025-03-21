import useSwr from 'swr'
import isUrl from 'validator/es/lib/isUrl'

export function useSheet (sheet: string | null | undefined) {
    const fetcher = async (url: string, init: RequestInit): Promise<any> => {
        const response = await fetch(url, init)
        return response.json()
    }
    const swrConfig = {
        fetcher,
    };
    const { data, error, isLoading } = useSwr(sheet && isUrl(sheet) && sheet.includes('docs.google.com/spreadsheets') ? sheet : null, swrConfig);
    return {
        data,
        error,
        isLoading
    }
}
export default useSheet