import './globals.css'

export const metadata = {
  title: 'まいにち がんばろう！ - がくしゅうカレンダー',
  description: '小学2年生向けの楽しい学習管理アプリ。毎日の学習を記録して、目標達成でご褒美をゲット！',
  keywords: '学習管理, 小学生, カレンダー, 学習記録, 子供向け',
  authors: [{ name: 'Learning Tracker Team' }],
  openGraph: {
    title: 'まいにち がんばろう！ - がくしゅうカレンダー',
    description: '小学2年生向けの楽しい学習管理アプリ',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'まいにち がんばろう！ - がくしゅうカレンダー',
    description: '小学2年生向けの楽しい学習管理アプリ',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#8B5CF6',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⭐</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  )
}
