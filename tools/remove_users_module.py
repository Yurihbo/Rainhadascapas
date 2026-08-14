from pathlib import Path
path = Path('/home/ubuntu/rainha-das-capas/client/src/pages/Home.tsx')
text = path.read_text()
start = text.index('function UsersModule(')
end = text.index('export default function Home()', start)
path.write_text(text[:start] + text[end:])
