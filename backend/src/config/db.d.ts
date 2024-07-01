declare module './db.js' {
    const mongodbConnect: () => Promise<void>;
    export default mongodbConnect;
}
