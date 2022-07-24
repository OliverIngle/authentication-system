let refreshTokenList: string[] = [];

export function pushRefreshToken(token: string): void {
    refreshTokenList.push(token);
}

export function refreshTokenExists(token: string): boolean {
    return refreshTokenList.some((item) => {
        return item === token;
    })
}

export function deleteToken(token: string): void {
    refreshTokenList = refreshTokenList.filter(item => item !== token);
}