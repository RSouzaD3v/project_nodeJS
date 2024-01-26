import 'dotenv/config'
import postgres from "postgres";

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`;

const sql = postgres({
    URL,   
    ssl: 'require',
    connection: {
    options: `project=${ENDPOINT_ID}`,
    },
});

export default sql;