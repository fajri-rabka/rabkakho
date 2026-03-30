const { execSync } = require("child_process");

function run(cmd) {
  console.log(`➡️ ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
}

try {
  console.log("🚀 Merge dev → master started...\n");

  const status = execSync("git status --porcelain").toString();
  if (status) {
    console.log("❌ You have uncommitted changes. Commit or stash first.");
    process.exit(1);
  }

  run("git checkout master");
  run("git pull origin master");
  run("git merge dev");
  run("git push origin master");

  console.log("\n✅ Merge completed!");
  run("git checkout dev");
} catch (err) {
  console.log("\n❌ Merge failed");
  process.exit(1);
}
