export const censorCntName = (originalName: string) => {
    return originalName.slice(0, 1) + "*" + originalName.slice(2, originalName.length)
}