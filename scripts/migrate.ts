import "dotenv/config";
import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";
import pg from "pg";

const { Client } = pg;

async function getDatabaseUrl() {
  const rawEnvPath = path.resolve(".env");
  try {
    const rawEnv = await fs.readFile(rawEnvPath, "utf8");
    const line = rawEnv
      .split(/\r?\n/)
      .find((entry) => entry.trim().startsWith("DATABASE_URL="));

    if (line) {
      return line
        .trim()
        .slice("DATABASE_URL=".length)
        .trim()
        .replace(/^["']|["']$/g, "");
    }
  } catch {
    // Fall back to dotenv-loaded process.env below.
  }

  return process.env.DATABASE_URL;
}

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function parsePostgresUrl(databaseUrl: string) {
  const withoutScheme = databaseUrl.replace(/^postgres(?:ql)?:\/\//, "");
  const atIndex = withoutScheme.lastIndexOf("@");
  if (atIndex === -1) {
    throw new Error("DATABASE_URL must include username, password, host, and database.");
  }

  const credentials = withoutScheme.slice(0, atIndex);
  const hostAndDatabase = withoutScheme.slice(atIndex + 1);
  const credentialSplit = credentials.indexOf(":");
  if (credentialSplit === -1) {
    throw new Error("DATABASE_URL must include a password.");
  }

  const user = safeDecode(credentials.slice(0, credentialSplit));
  const password = safeDecode(credentials.slice(credentialSplit + 1));
  const slashIndex = hostAndDatabase.indexOf("/");
  const authority = slashIndex === -1 ? hostAndDatabase : hostAndDatabase.slice(0, slashIndex);
  const databaseAndQuery = slashIndex === -1 ? "postgres" : hostAndDatabase.slice(slashIndex + 1);
  const database = safeDecode(databaseAndQuery.split("?", 1)[0] || "postgres");
  const colonIndex = authority.lastIndexOf(":");
  const host = colonIndex === -1 ? authority : authority.slice(0, colonIndex);
  const port = colonIndex === -1 ? 5432 : Number(authority.slice(colonIndex + 1));

  if (!host || !Number.isInteger(port)) {
    throw new Error("DATABASE_URL host or port is invalid.");
  }

  return {
    user,
    password,
    host,
    port,
    database,
  };
}

function getConnectionCandidates(connection: ReturnType<typeof parsePostgresUrl>) {
  const candidates = [connection];

  if (connection.password.startsWith("[") && connection.password.endsWith("]")) {
    candidates.push({
      ...connection,
      password: connection.password.slice(1, -1),
    });
  }

  return candidates;
}

const migrationsDir = path.resolve("supabase", "migrations");

async function getMigrationFiles() {
  const entries = await fs.readdir(migrationsDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".sql"))
    .map((entry) => entry.name)
    .sort();
}

async function main() {
  const databaseUrl = await getDatabaseUrl();
  if (!databaseUrl) {
    console.error("DATABASE_URL is missing. Add it to .env before running migrations.");
    process.exit(1);
  }

  const connection = parsePostgresUrl(databaseUrl);
  const files = await getMigrationFiles();
  if (files.length === 0) {
    console.log("No migration files found.");
    return;
  }

  console.log(
    `Connecting to ${connection.host}:${connection.port}/${connection.database} for migrations.`,
  );
  let client: pg.Client | null = null;
  let lastConnectionError: unknown = null;

  for (const candidate of getConnectionCandidates(connection)) {
    const candidateClient = new Client({
      ...candidate,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    try {
      await candidateClient.connect();
      client = candidateClient;
      break;
    } catch (error) {
      lastConnectionError = error;
      await candidateClient.end().catch(() => undefined);
    }
  }

  if (!client) {
    throw lastConnectionError instanceof Error
      ? lastConnectionError
      : new Error("Unable to connect to database.");
  }

  try {
    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      const sql = await fs.readFile(filePath, "utf8");
      console.log(`Running migration: ${file}`);
      await client.query(sql);
    }

    console.log(`Applied ${files.length} migration(s).`);
  } finally {
    await client.end();
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Unknown migration error";
  console.error(`Migration failed: ${message}`);
  process.exit(1);
});
