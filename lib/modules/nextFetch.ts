

export async function nextFetcNoCaching(url: string, params: any): Promise<any> {
    const nextParams = { 
        ...params, 
        next: {
            ...params.next,
            next: { revalidate: 10 } 
        }
    };
    const response = await fetch(url, nextParams);
    return response;
}