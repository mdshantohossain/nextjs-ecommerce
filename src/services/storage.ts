
export default {
    setItem: async (key: string, value: any) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error)
        }
    },
    getItem: async (key: string) => {
        try {
        const res = localStorage.getItem(key);
        return JSON.stringify(res);
        } catch(error) {
            console.error(error);
        }
    },
    removeItem: async (key: string) => {
        localStorage.removeItem(key);
    },
}