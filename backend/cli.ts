const monk = require("monk");
let logger = require("winston");
const dbUrl = "localhost:27017/";
let db: any;
import * as bcrypt from "bcrypt";

const cli = require("yargs")
    .command(
        "create-admin-user <username> <email> <password>",
        "Create a new admin user",
        {},
        (argv: any) => createAdminUser(argv.username, argv.email, argv.password))
    .command(
        "show-admin-users",
        "Show all admins",
        {},
        (argv: any) => listAdminUsers())
    .help()
    .demand(1)
    .argv;


async function connectDB() {
    let dbName = process.env.DB_NAME;
    if (dbName == null) {
        logger.error("DB_NAME environment variable not defined!");
        logger.error("Could not connect to MongoDB!");
        process.exit(1);
    } else {
        logger.info("Connecting to the database...");
        return monk(dbUrl + dbName).then((result: any) => {
            db = result;
            logger.info("Connection to MongoDB successful.");
        }).catch(() => {
            logger.error("Could not connect to MongoDB!");
            process.exit(1);
        });
    }
}

async function init() {
    logger.clear();
    logger.add(
        logger.transports.Console, {
            json: false,
            colorize: true,
            level: "debug"
        });
    await connectDB();
}

function exit(code: number) {
    db.close();
    process.exit(code);
}

async function createAdminUser(user: string, email: string, password: string) {
    await init();
    logger.info(`Creating new admin: ${user} <${email}> with password ${password}`);
    let result = await db.get("admins").find({"username": user});
    if (result.length !== 0) {
        logger.error("User with this name already exits. Aborting.");
        exit(0);
    }
    result = await db.get("admins").find({"email": email});
    if (result.length !== 0) {
        logger.error("User with this email already exits. Aborting.");
        exit(0);
    }
    bcrypt.hash(password, 10).then((hash) => {
        // store to db
        logger.info(`Hash: ${hash}`);
        db.get("admins").insert(
            {
                "username": user,
                "email": email,
                "pw_hash": hash
            })
            .then(() => {
                logger.info("Successfully added admin.");
                exit(0);
            });
    });

}

async function listAdminUsers() {
    await init();
    let result = await db.get("admins").find({});
    if (result.length === 0) {
        logger.warn("No admins found. You might want to create one.");
    } else {
        logger.info(`Found ${result.length} admins:`);
        for (let admin of result) {
            logger.info(`\t${admin.username}\t\t\t <${admin.email}>`);
        }
    }
    exit(0);
}
