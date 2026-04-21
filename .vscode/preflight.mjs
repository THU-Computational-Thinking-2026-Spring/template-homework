// 提交前检查：确保 metadata.json 字段齐全、public/index.html 存在、thumbnail 已准备
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const errors = [];
const warnings = [];

function must(cond, msg) { if (!cond) errors.push(msg); }
function warn(cond, msg) { if (!cond) warnings.push(msg); }

// 1) metadata.json
const metaPath = path.join(root, 'metadata.json');
must(fs.existsSync(metaPath), 'metadata.json 不存在');
let meta = {};
if (fs.existsSync(metaPath)) {
  try {
    meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
  } catch (e) {
    errors.push(`metadata.json 无法解析：${e.message}`);
  }
}
must(meta.studentId && !String(meta.studentId).startsWith('TODO'), 'metadata.studentId 未填写');
must(meta.name && !String(meta.name).startsWith('TODO'), 'metadata.name 未填写');
must(meta.projectTitle && !String(meta.projectTitle).startsWith('TODO'), 'metadata.projectTitle 未填写');
must(['A', 'B'].includes(meta.track), 'metadata.track 必须是 "A" 或 "B"');
warn(meta.description && meta.description.length <= 120, 'metadata.description 建议 60~120 字');
warn(Array.isArray(meta.tags) && meta.tags.length >= 1, '建议至少填写 1 个 tag');

// 2) public/
const pub = path.join(root, 'public');
must(fs.existsSync(pub), 'public/ 目录不存在');
must(fs.existsSync(path.join(pub, 'index.html')), 'public/index.html 不存在');
warn(
  ['thumbnail.png', 'thumbnail.jpg', 'thumbnail.svg'].some((f) => fs.existsSync(path.join(pub, f))),
  '建议提供 public/thumbnail.png（800×500 左右），门户卡片会用',
);

// 3) docs/
const docs = path.join(root, 'docs');
if (fs.existsSync(docs)) {
  const pdfs = fs.readdirSync(docs).filter((f) => f.toLowerCase().endsWith('.pdf'));
  warn(pdfs.length > 0, 'docs/ 下还没有 PDF 设计文档，请记得最终前放入');
}

// 4) 不要 commit node_modules 等
const suspicious = ['node_modules', 'dist', '.DS_Store'];
for (const s of suspicious) {
  warn(!fs.existsSync(path.join(root, s)) || fs.existsSync(path.join(root, '.gitignore')),
    `项目中存在 ${s}，请确认 .gitignore 已覆盖`);
}

// 报告
console.log('\n=== 提交前检查报告 ===\n');
if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ 一切 OK，可以放心 push 了！');
} else {
  if (errors.length) {
    console.log(`❌ 错误 ${errors.length} 条（必须修复）：`);
    errors.forEach((m) => console.log(`  - ${m}`));
  }
  if (warnings.length) {
    console.log(`\n⚠️  警告 ${warnings.length} 条（建议修复）：`);
    warnings.forEach((m) => console.log(`  - ${m}`));
  }
}
console.log('');
if (errors.length) process.exit(1);
