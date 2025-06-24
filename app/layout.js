import './globals.css'

export const metadata = {
  title: 'がくしゅうカレンダー',
  description: '小学2年生向けの学習管理アプリ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
